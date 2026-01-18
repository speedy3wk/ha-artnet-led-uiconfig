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
import { fromArtnetYaml, toArtnetYaml } from "./yaml";

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

const CHANNEL_OPTIONS: Array<{ key: string; label: string; description: string }> = [
  { key: "d", label: "d", description: "Dimmer (scaled)" },
  { key: "c", label: "c", description: "Cool white (scaled)" },
  { key: "C", label: "C", description: "Cool white (unscaled)" },
  { key: "h", label: "h", description: "Warm white (scaled)" },
  { key: "H", label: "H", description: "Warm white (unscaled)" },
  { key: "t", label: "t", description: "Temperature (0 warm → 255 cold)" },
  { key: "T", label: "T", description: "Temperature (255 warm → 0 cold)" },
  { key: "r", label: "r", description: "Red (scaled)" },
  { key: "R", label: "R", description: "Red (unscaled)" },
  { key: "g", label: "g", description: "Green (scaled)" },
  { key: "G", label: "G", description: "Green (unscaled)" },
  { key: "b", label: "b", description: "Blue (scaled)" },
  { key: "B", label: "B", description: "Blue (unscaled)" },
  { key: "w", label: "w", description: "White (scaled)" },
  { key: "W", label: "W", description: "White (unscaled)" },
  { key: "u", label: "u", description: "Hue" },
  { key: "U", label: "U", description: "Saturation" },
  { key: "x", label: "x", description: "X value (XY color mode)" },
  { key: "y", label: "y", description: "Y value (XY color mode)" }
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
      this._importError = error instanceof Error ? error.message : "Ungültiges YAML";
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
            <button class="primary" @click=${this._addNode}>Node hinzufügen</button>
            <button @click=${this._openImport}>YAML importieren</button>
            <button @click=${this._loadExample}>Beispiel laden</button>
            <button @click=${this._clearAll}>Alles leeren</button>
          </div>
        </div>

        ${this._config.nodes.length === 0
          ? html`<div class="empty">Keine Nodes vorhanden. Nutze “Node hinzufügen”.</div>`
          : this._config.nodes.map((node, nodeIndex) => this.renderNode(node, nodeIndex))}

        ${this.hideYaml
          ? null
          : html`
              <section class="yaml">
                <div class="yaml-header">
                  <div>
                    <div class="yaml-title">YAML Vorschau</div>
                    <div class="yaml-subtitle">
                      Kopiere diesen Block in deine configuration.yaml (HA erlaubt kein direktes
                      Schreiben aus dem UI-Editor).
                    </div>
                  </div>
                  <button @click=${this._copyYaml}>YAML kopieren</button>
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
          <div class="node-title">Node ${nodeIndex + 1}</div>
          <button class="danger" @click=${() => this._removeNode(nodeIndex)}>Entfernen</button>
        </div>
        <div class="node-fields">
          <label>
            Host/IP
            <input
              type="text"
              .value=${node.host}
              @input=${(event: Event) =>
                this._updateNodeField(nodeIndex, "host", (event.target as HTMLInputElement).value)}
              placeholder="192.168.0.10"
            />
          </label>
          <label>
            Node Type
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
            Max FPS
            <input
              type="number"
              .value=${String(node.max_fps ?? 25)}
              @input=${(event: Event) =>
                this._updateNodeField(nodeIndex, "max_fps", (event.target as HTMLInputElement).value)}
            />
          </label>
          <label>
            Refresh (s)
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
            <div>Universes</div>
            <button @click=${() => this._addUniverse(nodeIndex)}>Universe hinzufügen</button>
          </div>
          ${node.universes.length === 0
            ? html`<div class="empty">Noch keine Universes.</div>`
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
          <div>Universe ${universe.id}</div>
          <div class="universe-actions">
            <button @click=${() => this._addDevice(nodeIndex, universeIndex)}>Lampe hinzufügen</button>
            <button class="danger" @click=${() => this._removeUniverse(nodeIndex, universeIndex)}>
              Entfernen
            </button>
          </div>
        </div>
        <div class="universe-fields">
          <label>
            Universe ID
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
            Output Correction
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
            ? html`<div class="empty">Keine Lampen in diesem Universe.</div>`
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
              <div class="modal-title">YAML importieren</div>
              <div class="modal-subtitle">Füge deine artnet_led Konfiguration ein.</div>
            </div>
            <button class="danger" @click=${this._closeImport}>Schließen</button>
          </div>
          <textarea
            class="yaml-input"
            .value=${this._importYaml}
            @input=${(event: Event) => (this._importYaml = (event.target as HTMLTextAreaElement).value)}
            placeholder="light:\n  - platform: artnet_led\n    host: 192.168.0.10\n    universes:"
          ></textarea>
          ${this._importError ? html`<div class="error">${this._importError}</div>` : null}
          <div class="modal-actions">
            <button class="primary" @click=${this._applyImport}>Importieren</button>
            <button @click=${this._closeImport}>Abbrechen</button>
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
              <div class="modal-title">Lampe bearbeiten</div>
              <div class="modal-subtitle">Universe ${state.universeIndex + 1}</div>
            </div>
            <button class="danger" @click=${this._closeDeviceEditor}>Schließen</button>
          </div>
          <div class="modal-grid">
            <label>
              Name
              <input
                type="text"
                .value=${device.name}
                @input=${(event: Event) =>
                  this._updateDeviceField("name", (event.target as HTMLInputElement).value)}
              />
            </label>
            <label>
              Channel
              <input
                type="number"
                .value=${String(device.channel)}
                @input=${(event: Event) =>
                  this._updateDeviceField("channel", (event.target as HTMLInputElement).value)}
              />
            </label>
            <label>
              Type
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
              Transition
              <input
                type="number"
                .value=${String(device.transition ?? 0)}
                @input=${(event: Event) =>
                  this._updateDeviceField("transition", (event.target as HTMLInputElement).value)}
              />
            </label>
            <label>
              Output Correction
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
              Channel Size
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
              Channel Setup
              <input
                type="text"
                .value=${Array.isArray(device.channel_setup)
                  ? device.channel_setup.join(",")
                  : device.channel_setup ?? ""}
                @input=${(event: Event) =>
                  this._updateDeviceField("channel_setup", (event.target as HTMLInputElement).value)}
                placeholder="rbgw oder 255"
              />
            </label>
            <label>
              Min Temp
              <input
                type="text"
                .value=${device.min_temp ?? ""}
                @input=${(event: Event) =>
                  this._updateDeviceField("min_temp", (event.target as HTMLInputElement).value)}
                placeholder="2500K"
              />
            </label>
            <label>
              Max Temp
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
            <button class="ghost" @click=${this._openChannelEditor}>Channel Setup Editor</button>
            <div class="modal-actions-right">
              <button class="primary" @click=${this._saveDeviceEditor}>Speichern</button>
              <button @click=${this._closeDeviceEditor}>Abbrechen</button>
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
              <div class="modal-title">Channel Setup Editor</div>
              <div class="modal-subtitle">Baue die DMX‑Kanäle per Drag & Drop.</div>
            </div>
            <button class="danger" @click=${this._closeChannelEditor}>Schließen</button>
          </div>
          <div class="channel-editor-body">
            <div class="channel-palette">
              <div class="palette-title">Bausteine</div>
              <div class="palette-grid">
                ${CHANNEL_OPTIONS.map(
                  (option) => html`
                    <button
                      class="palette-item"
                      @click=${() => this._addChannelToken(option.key)}
                      title=${option.description}
                    >
                      <span class="palette-key">${option.label}</span>
                      <span class="palette-desc">${option.description}</span>
                    </button>
                  `
                )}
              </div>
              <div class="palette-static">
                <label>
                  Statischer Wert (0‑255)
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
              <div class="sequence-title">Channel Reihenfolge</div>
              ${this._channelDraft.length === 0
                ? html`<div class="empty">Noch keine Kanäle.</div>`
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
            <button class="primary" @click=${this._saveChannelEditor}>Übernehmen</button>
            <button @click=${this._closeChannelEditor}>Abbrechen</button>
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

customElements.define("artnet-led-config-card-editor", ArtnetLedConfigCardEditor);
