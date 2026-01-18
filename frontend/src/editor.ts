import { LitElement, css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { EXAMPLE_CONFIG } from "./sample";
import {
  ArtnetLedCardConfig,
  ChannelSetup,
  DeviceConfig,
  EMPTY_CONFIG,
  NodeConfig,
  UniverseConfig
} from "./types";
import { EDITOR_TEXT } from "./i18n";
import { fromArtnetYaml, toArtnetYaml } from "./yaml";

const safeDefine = (tag: string, ctor: CustomElementConstructor) => {
  if (customElements.get(tag)) {
    return;
  }
  try {
    customElements.define(tag, ctor);
  } catch {
    return;
  }
};

interface DragState {
  nodeIndex: number;
  universeIndex: number;
  deviceIndex: number;
}

interface ActiveDeviceState extends DragState {
  device: DeviceConfig;
}

const cloneConfig = (config: ArtnetLedCardConfig): ArtnetLedCardConfig =>
  JSON.parse(JSON.stringify(config));

const iconForType = (type?: string) => {
  switch (type) {
    case "rgb":
    case "rgbw":
    case "rgbww":
      return "mdi:palette";
    case "color_temp":
      return "mdi:thermometer";
    case "fixed":
      return "mdi:lightbulb";
    case "binary":
      return "mdi:toggle-switch";
    case "dimmer":
      return "mdi:brightness-6";
    default:
      return "mdi:lightbulb-outline";
  }
};

const parseNumber = (value: string, fallback?: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const parseChannelSetup = (value: string): ChannelSetup | undefined => {
  const trimmed = value.trim();
  if (!trimmed) {
    return undefined;
  }
  if (trimmed.includes(",")) {
    return trimmed
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => {
        const parsed = Number(item);
        return Number.isFinite(parsed) ? parsed : item;
      });
  }
  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? [parsed] : trimmed;
};

const channelSetupToArray = (value: ChannelSetup | undefined): Array<string | number> => {
  if (value === undefined || value === null || value === "") {
    return [];
  }
  if (Array.isArray(value)) {
    return [...value];
  }
  return String(value)
    .split("")
    .map((item) => item.trim())
    .filter(Boolean);
};

const CHANNEL_OPTIONS: Array<{ key: string; label: string; descKey: string }> = [
  { key: "d", label: "d", descKey: "channelDimmer" },
  { key: "c", label: "c", descKey: "channelCoolScaled" },
  { key: "C", label: "C", descKey: "channelCoolUnscaled" },
  { key: "h", label: "h", descKey: "channelWarmScaled" },
  { key: "H", label: "H", descKey: "channelWarmUnscaled" },
  { key: "t", label: "t", descKey: "channelTempScaled" },
  { key: "T", label: "T", descKey: "channelTempUnscaled" },
  { key: "r", label: "r", descKey: "channelRedScaled" },
  { key: "R", label: "R", descKey: "channelRedUnscaled" },
  { key: "g", label: "g", descKey: "channelGreenScaled" },
  { key: "G", label: "G", descKey: "channelGreenUnscaled" },
  { key: "b", label: "b", descKey: "channelBlueScaled" },
  { key: "B", label: "B", descKey: "channelBlueUnscaled" },
  { key: "w", label: "w", descKey: "channelWhiteScaled" },
  { key: "W", label: "W", descKey: "channelWhiteUnscaled" },
  { key: "u", label: "u", descKey: "channelHue" },
  { key: "U", label: "U", descKey: "channelSaturation" },
  { key: "x", label: "x", descKey: "channelX" },
  { key: "y", label: "y", descKey: "channelY" }
];


export class ArtnetLedConfigCardEditor extends LitElement {
  @property({ attribute: false }) public hass?: unknown;
  @property({ attribute: false }) public config?: ArtnetLedCardConfig;
  @property({ type: Boolean, attribute: "compact" }) public compact = false;
  @property({ type: Boolean, attribute: "hide-yaml" }) public hideYaml = false;

  @state() private _config: ArtnetLedCardConfig = EMPTY_CONFIG;
  @state() private _dragging?: DragState;
  @state() private _activeDevice?: ActiveDeviceState;
  @state() private _showImport = false;
  @state() private _importYaml = "";
  @state() private _importError?: string;
  @state() private _showChannelEditor = false;
  @state() private _channelDraft: Array<string | number> = [];
  @state() private _channelDragIndex?: number;

  private _lang() {
    const lang = (this.hass as any)?.language ?? navigator.language ?? "en";
    return lang.toLowerCase().startsWith("de") ? "de" : "en";
  }

  private _t(key: keyof typeof EDITOR_TEXT.en) {
    return EDITOR_TEXT[this._lang()][key];
  }

  protected updated(changedProps: Map<string, unknown>) {
    if (changedProps.has("config") && this.config) {
      this.setConfig(this.config);
    }
  }

  public setConfig(config: ArtnetLedCardConfig) {
    this._config = {
      ...EMPTY_CONFIG,
      ...config,
      nodes: config.nodes ?? []
    };
  }

  private _updateConfig(config: ArtnetLedCardConfig) {
    this._config = config;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._config },
        bubbles: true,
        composed: true
      })
    );
  }


  private _addNode() {
    const next = cloneConfig(this._config);
    next.nodes.push({
      host: "",
      node_type: "artnet-direct",
      max_fps: 25,
      refresh_every: 0,
      universes: []
    });
    this._updateConfig(next);
  }

  private _addUniverse(nodeIndex: number) {
    const next = cloneConfig(this._config);
    const node = next.nodes[nodeIndex];
    const newUniverseId = node.universes.length
      ? Math.max(...node.universes.map((u) => u.id)) + 1
      : 0;
    node.universes.push({
      id: newUniverseId,
      send_partial_universe: true,
      devices: []
    });
    this._updateConfig(next);
  }

  private _addDevice(nodeIndex: number, universeIndex: number) {
    const next = cloneConfig(this._config);
    const universe = next.nodes[nodeIndex].universes[universeIndex];
    universe.devices.push({
      channel: 1,
      name: "new_light",
      type: "dimmer"
    });
    this._updateConfig(next);
  }

  private _removeNode(nodeIndex: number) {
    const next = cloneConfig(this._config);
    next.nodes.splice(nodeIndex, 1);
    this._updateConfig(next);
  }

  private _removeUniverse(nodeIndex: number, universeIndex: number) {
    const next = cloneConfig(this._config);
    next.nodes[nodeIndex].universes.splice(universeIndex, 1);
    this._updateConfig(next);
  }

  private _removeDevice(nodeIndex: number, universeIndex: number, deviceIndex: number) {
    const next = cloneConfig(this._config);
    next.nodes[nodeIndex].universes[universeIndex].devices.splice(deviceIndex, 1);
    this._updateConfig(next);
  }

  private _updateNodeField(nodeIndex: number, key: keyof NodeConfig, value: string) {
    const next = cloneConfig(this._config);
    const node = next.nodes[nodeIndex] as NodeConfig;
    if (key === "max_fps" || key === "refresh_every" || key === "port") {
      node[key] = parseNumber(value, 0) as never;
    } else {
      node[key] = value as never;
    }
    this._updateConfig(next);
  }

  private _updateUniverseField(
    nodeIndex: number,
    universeIndex: number,
    key: keyof UniverseConfig,
    value: string
  ) {
    const next = cloneConfig(this._config);
    const universe = next.nodes[nodeIndex].universes[universeIndex] as UniverseConfig;
    if (key === "id") {
      universe[key] = parseNumber(value, 0) as never;
    } else {
      universe[key] = value as never;
    }
    this._updateConfig(next);
  }

  private _openDeviceEditor(nodeIndex: number, universeIndex: number, deviceIndex: number) {
    const device = this._config.nodes[nodeIndex].universes[universeIndex].devices[deviceIndex];
    this._activeDevice = {
      nodeIndex,
      universeIndex,
      deviceIndex,
      device: { ...device }
    };
  }

  private _closeDeviceEditor() {
    this._activeDevice = undefined;
  }

  private _saveDeviceEditor() {
    if (!this._activeDevice) {
      return;
    }
    const { nodeIndex, universeIndex, deviceIndex, device } = this._activeDevice;
    const next = cloneConfig(this._config);
    next.nodes[nodeIndex].universes[universeIndex].devices[deviceIndex] = device;
    this._updateConfig(next);
    this._activeDevice = undefined;
  }

  private _openChannelEditor() {
    if (!this._activeDevice) {
      return;
    }
    this._channelDraft = channelSetupToArray(this._activeDevice.device.channel_setup);
    this._showChannelEditor = true;
  }

  private _closeChannelEditor() {
    this._showChannelEditor = false;
    this._channelDragIndex = undefined;
  }

  private _addChannelToken(token: string | number) {
    this._channelDraft = [...this._channelDraft, token];
  }

  private _removeChannelToken(index: number) {
    this._channelDraft = this._channelDraft.filter((_, idx) => idx !== index);
  }

  private _setChannelDraftValue(value: string) {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) {
      return;
    }
    const clamped = Math.min(255, Math.max(0, parsed));
    this._channelDraft = [...this._channelDraft, clamped];
  }

  private _saveChannelEditor() {
    if (!this._activeDevice) {
      return;
    }
    const next = {
      ...this._activeDevice.device,
      channel_setup: this._channelDraft.length ? [...this._channelDraft] : undefined
    };
    this._activeDevice = { ...this._activeDevice, device: next };
    this._showChannelEditor = false;
  }

  private _onChannelDragStart(event: DragEvent, index: number) {
    this._channelDragIndex = index;
    event.dataTransfer?.setData("text/plain", String(index));
  }

  private _onChannelDragOver(event: DragEvent) {
    event.preventDefault();
  }

  private _onChannelDrop(event: DragEvent, index: number) {
    event.preventDefault();
    const sourceIndex = this._channelDragIndex;
    if (sourceIndex === undefined || sourceIndex === index) {
      this._channelDragIndex = undefined;
      return;
    }
    const next = [...this._channelDraft];
    const [item] = next.splice(sourceIndex, 1);
    next.splice(index, 0, item);
    this._channelDraft = next;
    this._channelDragIndex = undefined;
  }

  private _updateDeviceField(key: keyof DeviceConfig, value: string) {
    if (!this._activeDevice) {
      return;
    }
    let nextValue: string | number | ChannelSetup | undefined = value;
    if (key === "channel" || key === "transition") {
      nextValue = parseNumber(value, 0);
    }
    if (key === "channel_setup") {
      nextValue = parseChannelSetup(value);
    }
    this._activeDevice = {
      ...this._activeDevice,
      device: {
        ...this._activeDevice.device,
        [key]: nextValue as never
      }
    };
  }

  private _copyYaml() {
    const yaml = toArtnetYaml(this._config);
    navigator.clipboard?.writeText(yaml);
  }

  private _loadExample() {
    this._updateConfig(cloneConfig(EXAMPLE_CONFIG));
  }

  private _clearAll() {
    this._updateConfig({ ...EMPTY_CONFIG, nodes: [] });
  }

  private _openImport() {
    this._showImport = true;
    this._importYaml = "";
    this._importError = undefined;
  }

  private _closeImport() {
    this._showImport = false;
    this._importError = undefined;
  }

  private _applyImport() {
    try {
      const next = fromArtnetYaml(this._importYaml);
      this._updateConfig({ ...next, title: this._config.title ?? "" });
      this._showImport = false;
    } catch (error) {
      this._importError = error instanceof Error ? error.message : this._t("invalidYaml");
    }
  }

  private _onDragStart(event: DragEvent, nodeIndex: number, universeIndex: number, deviceIndex: number) {
    event.dataTransfer?.setData("text/plain", "device");
    this._dragging = { nodeIndex, universeIndex, deviceIndex };
  }

  private _onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  private _onDrop(event: DragEvent, nodeIndex: number, universeIndex: number, deviceIndex: number) {
    event.preventDefault();
    if (!this._dragging) {
      return;
    }
    const dragging = this._dragging;
    if (dragging.nodeIndex !== nodeIndex || dragging.universeIndex !== universeIndex) {
      this._dragging = undefined;
      return;
    }
    const next = cloneConfig(this._config);
    const devices = next.nodes[nodeIndex].universes[universeIndex].devices;
    const [moved] = devices.splice(dragging.deviceIndex, 1);
    devices.splice(deviceIndex, 0, moved);
    this._dragging = undefined;
    this._updateConfig(next);
  }

  protected render() {
    return html`
      <section class="editor">
        <div class="toolbar${this.compact ? " compact" : ""}">
          <div class="buttons">
            <button class="primary" @click=${this._addNode}>${this._t("addNode")}</button>
            <button @click=${this._openImport}>${this._t("importYaml")}</button>
            <button @click=${this._loadExample}>${this._t("loadExample")}</button>
            <button @click=${this._clearAll}>${this._t("clearAll")}</button>
          </div>
        </div>

        ${this._config.nodes.length === 0
          ? html`<div class="empty">${this._t("noNodes")}</div>`
          : this._config.nodes.map((node, nodeIndex) => this.renderNode(node, nodeIndex))}

        ${this.hideYaml
          ? null
          : html`
              <section class="yaml">
                <div class="yaml-header">
                  <div>
                    <div class="yaml-title">${this._t("yamlPreview")}</div>
                    <div class="yaml-subtitle">
                      ${this._t("yamlSubtitle")}
                    </div>
                  </div>
                  <button @click=${this._copyYaml}>${this._t("copyYaml")}</button>
                </div>
                <pre>${toArtnetYaml(this._config)}</pre>
              </section>
            `}
      </section>

      ${this._activeDevice ? this.renderDeviceEditor(this._activeDevice) : null}
      ${this._showImport ? this.renderImportModal() : null}
      ${this.renderChannelEditor()}
    `;
  }

  private renderNode(node: NodeConfig, nodeIndex: number) {
    return html`
      <section class="node">
        <div class="node-header">
          <div class="node-title">${this._t("nodeTitle")} ${nodeIndex + 1}</div>
          <button class="danger" @click=${() => this._removeNode(nodeIndex)}>
            ${this._t("remove")}
          </button>
        </div>
        <div class="node-fields">
          <label>
            ${this._t("hostIp")}
            <input
              type="text"
              .value=${node.host}
              @input=${(event: Event) =>
                this._updateNodeField(nodeIndex, "host", (event.target as HTMLInputElement).value)}
              placeholder="192.168.0.10"
            />
          </label>
          <label>
            ${this._t("nodeType")}
            <select
              .value=${node.node_type ?? "artnet-direct"}
              @change=${(event: Event) =>
                this._updateNodeField(nodeIndex, "node_type", (event.target as HTMLSelectElement).value)}
            >
              <option value="artnet-direct">artnet-direct</option>
              <option value="artnet-controller">artnet-controller</option>
              <option value="sacn">sacn</option>
              <option value="kinet">kinet</option>
            </select>
          </label>
          <label>
            ${this._t("maxFps")}
            <input
              type="number"
              .value=${String(node.max_fps ?? 25)}
              @input=${(event: Event) =>
                this._updateNodeField(nodeIndex, "max_fps", (event.target as HTMLInputElement).value)}
            />
          </label>
          <label>
            ${this._t("refresh")}
            <input
              type="number"
              .value=${String(node.refresh_every ?? 0)}
              @input=${(event: Event) =>
                this._updateNodeField(
                  nodeIndex,
                  "refresh_every",
                  (event.target as HTMLInputElement).value
                )}
            />
          </label>
        </div>

        <div class="universes">
          <div class="universe-header">
            <div>${this._t("universes")}</div>
            <button @click=${() => this._addUniverse(nodeIndex)}>${this._t("addUniverse")}</button>
          </div>
          ${node.universes.length === 0
            ? html`<div class="empty">${this._t("noUniverses")}</div>`
            : node.universes.map((universe, universeIndex) =>
                this.renderUniverse(universe, nodeIndex, universeIndex)
              )}
        </div>
      </section>
    `;
  }

  private renderUniverse(universe: UniverseConfig, nodeIndex: number, universeIndex: number) {
    return html`
      <div class="universe">
        <div class="universe-title">
          <div>${this._t("universeTitle")} ${universe.id}</div>
          <div class="universe-actions">
            <button @click=${() => this._addDevice(nodeIndex, universeIndex)}>
              ${this._t("addLamp")}
            </button>
            <button class="danger" @click=${() => this._removeUniverse(nodeIndex, universeIndex)}>
              ${this._t("remove")}
            </button>
          </div>
        </div>
        <div class="universe-fields">
          <label>
            ${this._t("universeId")}
            <input
              type="number"
              .value=${String(universe.id)}
              @input=${(event: Event) =>
                this._updateUniverseField(
                  nodeIndex,
                  universeIndex,
                  "id",
                  (event.target as HTMLInputElement).value
                )}
            />
          </label>
          <label>
            ${this._t("outputCorrection")}
            <select
              .value=${universe.output_correction ?? ""}
              @change=${(event: Event) =>
                this._updateUniverseField(
                  nodeIndex,
                  universeIndex,
                  "output_correction",
                  (event.target as HTMLSelectElement).value
                )}
            >
              <option value="">(default)</option>
              <option value="linear">linear</option>
              <option value="quadratic">quadratic</option>
              <option value="cubic">cubic</option>
              <option value="quadruple">quadruple</option>
            </select>
          </label>
        </div>
        <div class="devices">
          ${universe.devices.length === 0
            ? html`<div class="empty">${this._t("noLamps")}</div>`
            : universe.devices.map((device, deviceIndex) =>
                this.renderDevice(device, nodeIndex, universeIndex, deviceIndex)
              )}
        </div>
      </div>
    `;
  }

  private renderDevice(
    device: DeviceConfig,
    nodeIndex: number,
    universeIndex: number,
    deviceIndex: number
  ) {
    return html`
      <div
        class="device"
        draggable="true"
        @dragstart=${(event: DragEvent) =>
          this._onDragStart(event, nodeIndex, universeIndex, deviceIndex)}
        @dragover=${this._onDragOver}
        @drop=${(event: DragEvent) => this._onDrop(event, nodeIndex, universeIndex, deviceIndex)}
      >
        <ha-icon class="device-icon" icon=${iconForType(device.type)}></ha-icon>
        <div class="device-info" @click=${() =>
          this._openDeviceEditor(nodeIndex, universeIndex, deviceIndex)}>
          <div class="device-name">${device.name}</div>
          <div class="device-meta">Ch ${device.channel} · ${device.type ?? "dimmer"}</div>
        </div>
        <button class="danger" @click=${() =>
          this._removeDevice(nodeIndex, universeIndex, deviceIndex)}>
          ✕
        </button>
      </div>
    `;
  }

  private renderImportModal() {
    return html`
      <div class="overlay" @click=${this._closeImport}>
        <div class="modal" @click=${(event: Event) => event.stopPropagation()}>
          <div class="modal-header">
            <div>
              <div class="modal-title">${this._t("yamlImportTitle")}</div>
              <div class="modal-subtitle">${this._t("yamlImportSubtitle")}</div>
            </div>
            <button class="danger" @click=${this._closeImport}>${this._t("close")}</button>
          </div>
          <textarea
            class="yaml-input"
            .value=${this._importYaml}
            @input=${(event: Event) => (this._importYaml = (event.target as HTMLTextAreaElement).value)}
            placeholder="light:\n  - platform: artnet_led\n    host: 192.168.0.10\n    universes:"
          ></textarea>
          ${this._importError ? html`<div class="error">${this._importError}</div>` : null}
          <div class="modal-actions">
            <button class="primary" @click=${this._applyImport}>${this._t("importAction")}</button>
            <button @click=${this._closeImport}>${this._t("cancel")}</button>
          </div>
        </div>
      </div>
    `;
  }

  private renderDeviceEditor(state: ActiveDeviceState) {
    const device = state.device;
    return html`
      <div class="overlay" @click=${this._closeDeviceEditor}>
        <div class="modal" @click=${(event: Event) => event.stopPropagation()}>
          <div class="modal-header">
            <div>
              <div class="modal-title">${this._t("editLamp")}</div>
              <div class="modal-subtitle">${this._t("universeTitle")} ${state.universeIndex + 1}</div>
            </div>
            <button class="danger" @click=${this._closeDeviceEditor}>${this._t("close")}</button>
          </div>
          <div class="modal-grid">
            <label>
              ${this._t("name")}
              <input
                type="text"
                .value=${device.name}
                @input=${(event: Event) =>
                  this._updateDeviceField("name", (event.target as HTMLInputElement).value)}
              />
            </label>
            <label>
              ${this._t("channel")}
              <input
                type="number"
                .value=${String(device.channel)}
                @input=${(event: Event) =>
                  this._updateDeviceField("channel", (event.target as HTMLInputElement).value)}
              />
            </label>
            <label>
              ${this._t("type")}
              <select
                .value=${device.type ?? "dimmer"}
                @change=${(event: Event) =>
                  this._updateDeviceField("type", (event.target as HTMLSelectElement).value)}
              >
                <option value="fixed">fixed</option>
                <option value="binary">binary</option>
                <option value="dimmer">dimmer</option>
                <option value="rgb">rgb</option>
                <option value="rgbw">rgbw</option>
                <option value="rgbww">rgbww</option>
                <option value="color_temp">color_temp</option>
              </select>
            </label>
            <label>
              ${this._t("transition")}
              <input
                type="number"
                .value=${String(device.transition ?? 0)}
                @input=${(event: Event) =>
                  this._updateDeviceField("transition", (event.target as HTMLInputElement).value)}
              />
            </label>
            <label>
              ${this._t("outputCorrection")}
              <select
                .value=${device.output_correction ?? ""}
                @change=${(event: Event) =>
                  this._updateDeviceField(
                    "output_correction",
                    (event.target as HTMLSelectElement).value
                  )}
              >
                <option value="">(default)</option>
                <option value="linear">linear</option>
                <option value="quadratic">quadratic</option>
                <option value="cubic">cubic</option>
                <option value="quadruple">quadruple</option>
              </select>
            </label>
            <label>
              ${this._t("channelSize")}
              <select
                .value=${device.channel_size ?? ""}
                @change=${(event: Event) =>
                  this._updateDeviceField("channel_size", (event.target as HTMLSelectElement).value)}
              >
                <option value="">(default)</option>
                <option value="8bit">8bit</option>
                <option value="16bit">16bit</option>
                <option value="24bit">24bit</option>
                <option value="32bit">32bit</option>
              </select>
            </label>
            <label>
              ${this._t("channelSetup")}
              <input
                type="text"
                .value=${Array.isArray(device.channel_setup)
                  ? device.channel_setup.join(",")
                  : device.channel_setup ?? ""}
                @input=${(event: Event) =>
                  this._updateDeviceField("channel_setup", (event.target as HTMLInputElement).value)}
                placeholder=${this._lang() === "de" ? "rbgw oder 255" : "rgbw or 255"}
              />
            </label>
            <label>
              ${this._t("minTemp")}
              <input
                type="text"
                .value=${device.min_temp ?? ""}
                @input=${(event: Event) =>
                  this._updateDeviceField("min_temp", (event.target as HTMLInputElement).value)}
                placeholder="2500K"
              />
            </label>
            <label>
              ${this._t("maxTemp")}
              <input
                type="text"
                .value=${device.max_temp ?? ""}
                @input=${(event: Event) =>
                  this._updateDeviceField("max_temp", (event.target as HTMLInputElement).value)}
                placeholder="6500K"
              />
            </label>
          </div>
          <div class="modal-actions">
            <button class="ghost" @click=${this._openChannelEditor}>
              ${this._t("channelSetupEditor")}
            </button>
            <div class="modal-actions-right">
              <button class="primary" @click=${this._saveDeviceEditor}>${this._t("save")}</button>
              <button @click=${this._closeDeviceEditor}>${this._t("cancel")}</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private renderChannelEditor() {
    if (!this._showChannelEditor) {
      return null;
    }
    return html`
      <div class="overlay" @click=${this._closeChannelEditor}>
        <div class="modal channel-editor" @click=${(event: Event) => event.stopPropagation()}>
          <div class="modal-header">
            <div>
              <div class="modal-title">${this._t("channelEditorTitle")}</div>
              <div class="modal-subtitle">${this._t("channelEditorSubtitle")}</div>
            </div>
            <button class="danger" @click=${this._closeChannelEditor}>${this._t("close")}</button>
          </div>
          <div class="channel-editor-body">
            <div class="channel-palette">
              <div class="palette-title">${this._t("paletteTitle")}</div>
              <div class="palette-grid">
                ${CHANNEL_OPTIONS.map(
                  (option) => html`
                    <button
                      class="palette-item"
                      @click=${() => this._addChannelToken(option.key)}
                      title=${this._t(option.descKey as keyof typeof EDITOR_TEXT.en)}
                    >
                      <span class="palette-key">${option.label}</span>
                      <span class="palette-desc">
                        ${this._t(option.descKey as keyof typeof EDITOR_TEXT.en)}
                      </span>
                    </button>
                  `
                )}
              </div>
              <div class="palette-static">
                <label>
                  ${this._t("staticValue")}
                  <input
                    type="number"
                    min="0"
                    max="255"
                    placeholder="128"
                    @change=${(event: Event) =>
                      this._setChannelDraftValue((event.target as HTMLInputElement).value)}
                  />
                </label>
              </div>
            </div>
            <div class="channel-sequence" @dragover=${this._onChannelDragOver}>
              <div class="sequence-title">${this._t("channelOrder")}</div>
              ${this._channelDraft.length === 0
                ? html`<div class="empty">${this._t("noChannels")}</div>`
                : this._channelDraft.map(
                    (token, index) => html`
                      <div
                        class="channel-token"
                        draggable="true"
                        @dragstart=${(event: DragEvent) => this._onChannelDragStart(event, index)}
                        @drop=${(event: DragEvent) => this._onChannelDrop(event, index)}
                      >
                        <span>${token}</span>
                        <button class="mini" @click=${() => this._removeChannelToken(index)}>✕</button>
                      </div>
                    `
                  )}
            </div>
          </div>
          <div class="modal-actions">
            <button class="primary" @click=${this._saveChannelEditor}>${this._t("apply")}</button>
            <button @click=${this._closeChannelEditor}>${this._t("cancel")}</button>
          </div>
        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }

    .editor {
      display: grid;
      gap: 18px;
    }

    .toolbar {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      align-items: flex-end;
      justify-content: space-between;
    }

    .toolbar.compact {
      align-items: center;
    }

    .field {
      display: grid;
      gap: 6px;
    }

    label {
      display: grid;
      gap: 6px;
      font-size: 0.85rem;
      color: var(--secondary-text-color, #8b8b8b);
    }

    input,
    select {
      padding: 8px 10px;
      border-radius: 10px;
      border: 1px solid rgba(127, 127, 127, 0.25);
      background: rgba(255, 255, 255, 0.06);
      color: inherit;
    }

    button {
      border: none;
      padding: 8px 12px;
      border-radius: 10px;
      background: rgba(127, 127, 127, 0.2);
      color: inherit;
      cursor: pointer;
    }

    button.primary {
      background: var(--primary-color, #03a9f4);
      color: var(--text-primary-color, #fff);
    }

    button.danger {
      background: rgba(244, 67, 54, 0.18);
      color: #ff8a80;
    }

    .node {
      border-radius: 16px;
      padding: 16px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(127, 127, 127, 0.2);
      display: grid;
      gap: 14px;
    }

    .node-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .node-title {
      font-weight: 600;
    }

    .node-fields {
      display: grid;
      gap: 12px;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    }

    .universes {
      display: grid;
      gap: 12px;
    }

    .universe {
      padding: 12px;
      border-radius: 14px;
      border: 1px solid rgba(127, 127, 127, 0.16);
      background: rgba(255, 255, 255, 0.03);
      display: grid;
      gap: 12px;
    }

    .universe-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 600;
    }

    .universe-actions {
      display: flex;
      gap: 8px;
    }

    .universe-fields {
      display: grid;
      gap: 12px;
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    }

    .devices {
      display: grid;
      gap: 10px;
    }

    .device {
      display: grid;
      grid-template-columns: auto 1fr auto;
      gap: 12px;
      align-items: center;
      padding: 10px 12px;
      border-radius: 12px;
      border: 1px solid rgba(127, 127, 127, 0.2);
      background: rgba(255, 255, 255, 0.05);
      cursor: grab;
    }

    .device-icon {
      font-size: 1.1rem;
      color: var(--secondary-text-color, #9aa0a6);
    }

    .device-info {
      cursor: pointer;
    }

    .device-name {
      font-weight: 600;
    }

    .device-meta {
      font-size: 0.8rem;
      opacity: 0.7;
    }

    .yaml {
      border-radius: 16px;
      border: 1px solid rgba(127, 127, 127, 0.2);
      background: rgba(255, 255, 255, 0.02);
      padding: 14px 16px;
      display: grid;
      gap: 12px;
    }

    .yaml-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .yaml-title {
      font-weight: 600;
    }

    .yaml-subtitle {
      font-size: 0.8rem;
      opacity: 0.7;
    }

    pre {
      margin: 0;
      white-space: pre-wrap;
      font-size: 0.85rem;
      background: rgba(0, 0, 0, 0.2);
      padding: 12px;
      border-radius: 12px;
      max-height: 280px;
      overflow: auto;
    }

    .empty {
      padding: 12px;
      border: 1px dashed rgba(127, 127, 127, 0.3);
      border-radius: 12px;
      font-size: 0.85rem;
      opacity: 0.7;
      text-align: center;
    }

    .overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.55);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10;
    }

    .modal {
      background: var(--card-background-color, #1f1f1f);
      padding: 20px;
      border-radius: 18px;
      min-width: min(680px, 90vw);
      display: grid;
      gap: 16px;
      border: 1px solid rgba(127, 127, 127, 0.2);
    }

    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .modal-title {
      font-weight: 600;
      font-size: 1rem;
    }

    .modal-subtitle {
      font-size: 0.8rem;
      opacity: 0.7;
    }

    .modal-grid {
      display: grid;
      gap: 12px;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    }

    .modal-actions {
      display: flex;
      justify-content: space-between;
      gap: 10px;
    }

    .modal-actions-right {
      display: flex;
      gap: 10px;
    }

    .ghost {
      background: rgba(31, 41, 55, 0.8);
      color: inherit;
      border: 1px solid rgba(148, 163, 184, 0.25);
    }

    .channel-editor {
      max-width: 980px;
    }

    .channel-editor-body {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      gap: 16px;
    }

    .palette-title,
    .sequence-title {
      font-weight: 600;
      margin-bottom: 8px;
    }

    .palette-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: 8px;
    }

    .palette-item {
      display: grid;
      gap: 2px;
      padding: 8px 10px;
      border-radius: 10px;
      border: 1px solid rgba(148, 163, 184, 0.2);
      background: rgba(15, 23, 42, 0.8);
      color: inherit;
      text-align: left;
    }

    .palette-key {
      font-weight: 700;
      font-size: 0.9rem;
    }

    .palette-desc {
      font-size: 0.75rem;
      opacity: 0.7;
    }

    .palette-static {
      margin-top: 12px;
    }

    .channel-sequence {
      background: rgba(15, 23, 42, 0.6);
      border: 1px dashed rgba(148, 163, 184, 0.35);
      border-radius: 12px;
      padding: 12px;
      min-height: 200px;
    }

    .channel-token {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 8px 10px;
      margin-bottom: 8px;
      border-radius: 10px;
      background: rgba(31, 41, 55, 0.8);
      border: 1px solid rgba(148, 163, 184, 0.2);
      cursor: grab;
    }

    .channel-token .mini {
      padding: 2px 6px;
      font-size: 0.75rem;
    }

    .yaml-input {
      min-height: 220px;
      border-radius: 12px;
      border: 1px solid rgba(127, 127, 127, 0.2);
      background: rgba(0, 0, 0, 0.2);
      color: inherit;
      padding: 12px;
      font-size: 0.85rem;
      resize: vertical;
    }

    .error {
      color: #ff8a80;
      font-size: 0.85rem;
    }

    @media (max-width: 720px) {
      .toolbar {
        flex-direction: column;
        align-items: stretch;
      }
    }
  `;
}

safeDefine("artnet-led-config-card-editor", ArtnetLedConfigCardEditor);
