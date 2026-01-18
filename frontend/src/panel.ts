import { LitElement, css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { ArtnetLedCardConfig, EMPTY_CONFIG } from "./types";
import { toArtnetYaml } from "./yaml";
import "./editor";

const WS_GET = "ha_artnet_led_uiconfig/get";
const WS_SAVE = "ha_artnet_led_uiconfig/save";
const WS_DEPLOY = "ha_artnet_led_uiconfig/deploy";
const PANEL_VERSION = "0.1.0";

export class HaArtnetLedUiConfigPanel extends LitElement {
  @property({ attribute: false }) public hass?: any;

  @state() private _config: ArtnetLedCardConfig = { ...EMPTY_CONFIG };
  @state() private _status = "Bereit";
  @state() private _saving = false;
  @state() private _showYaml = false;
  @state() private _deploying = false;
  @state() private _deployDetail?: string;
  @state() private _saveDirty = false;
  @state() private _deployDirty = false;

  private _loaded = false;
  private _saveTimeout?: number;
  private _lastSaved?: string;
  private _lastDeployed?: string;

  protected updated(changedProps: Map<string, unknown>) {
    if (changedProps.has("hass") && this.hass && !this._loaded) {
      this._loaded = true;
      void this._loadConfig();
    }
  }

  private async _loadConfig() {
    this._status = "Lade...";
    try {
      const data = await this.hass.callWS({ type: WS_GET });
      this._config = { ...EMPTY_CONFIG, ...data, type: EMPTY_CONFIG.type };
      const snapshot = JSON.stringify(this._config);
      this._lastSaved = snapshot;
      this._lastDeployed = snapshot;
      this._saveDirty = false;
      this._deployDirty = false;
      this._status = "Geladen";
    } catch (error) {
      this._status = "Fehler beim Laden";
    }
  }

  private _onConfigChanged(event: CustomEvent) {
    const next = event.detail?.config as ArtnetLedCardConfig | undefined;
    if (!next) {
      return;
    }
    this._config = next;
    const snapshot = JSON.stringify(next);
    this._saveDirty = snapshot !== this._lastSaved;
    this._deployDirty = snapshot !== this._lastDeployed;
    this._queueSave();
  }

  private _queueSave() {
    if (this._saveTimeout) {
      window.clearTimeout(this._saveTimeout);
    }
    this._saving = true;
    this._status = "Speichere...";
    this._saveTimeout = window.setTimeout(() => void this._saveConfig(), 700);
  }

  private async _saveConfig() {
    try {
      await this.hass.callWS({ type: WS_SAVE, config: this._config });
      this._lastSaved = JSON.stringify(this._config);
      this._saveDirty = false;
      this._status = "Gespeichert";
    } catch (error) {
      this._status = "Fehler beim Speichern";
    }
    this._saving = false;
  }

  private _manualSave() {
    if (this._saveTimeout) {
      window.clearTimeout(this._saveTimeout);
    }
    void this._saveConfig();
  }

  private _toggleYaml() {
    this._showYaml = !this._showYaml;
  }

  private async _deployToAddon() {
    this._deploying = true;
    this._status = "Deploy läuft...";
    this._deployDetail = undefined;
    const yaml = toArtnetYaml(this._config);
    try {
      const result = await this.hass.callWS({ type: WS_DEPLOY, yaml });
      if (result?.error) {
        const message =
          result.error?.message ||
          result.error?.error ||
          (typeof result.error === "string" ? result.error : JSON.stringify(result.error));
        const status = result.status ? `Status ${result.status}` : undefined;
        const url = result.url ? `URL: ${result.url}` : undefined;
        this._deployDetail = [message, status, url].filter(Boolean).join(" · ");
        this._status = "Deploy fehlgeschlagen";
        this._deploying = false;
        return;
      }
      if (result?.reload === "failed") {
        const details = [result?.error ?? "Reload fehlgeschlagen"];
        if (result?.ha_url) {
          details.push(`HA URL: ${result.ha_url}`);
        }
        if (result?.token_source) {
          details.push(`Token: ${result.token_source}`);
        }
        if (typeof result?.token_present === "boolean") {
          details.push(`Token present: ${result.token_present}`);
        }
        if (typeof result?.token_length === "number") {
          details.push(`Token length: ${result.token_length}`);
        }
        this._deployDetail = details.filter(Boolean).join(" · ");
        this._status = "Deploy mit Fehler";
      } else {
        this._deployDetail = result?.reload ? `Reload: ${result.reload}` : undefined;
        this._status = "Deploy OK";
      }
      if (result?.status === "written" || result?.status === undefined) {
        this._lastDeployed = JSON.stringify(this._config);
        this._deployDirty = false;
      }
    } catch (error) {
      this._status = "Deploy fehlgeschlagen";
      const anyError = error as any;
      this._deployDetail =
        anyError?.message || anyError?.error || anyError?.body?.message || JSON.stringify(error);
    }
    this._deploying = false;
  }

  protected render() {
    return html`
      <section class="panel">
        <header class="header">
          <div>
            <div class="title">Art-Net LED UI Config</div>
            <div class="subtitle">${this._status}</div>
            <div class="version">${PANEL_VERSION}</div>
            ${this._deployDetail ? html`<div class="detail">${this._deployDetail}</div>` : null}
          </div>
          <div class="actions">
            <button @click=${() => void this._loadConfig()}>Neu laden</button>
            <button @click=${this._toggleYaml}>
              ${this._showYaml ? "YAML ausblenden" : "YAML anzeigen"}
            </button>
            <button
              class=${this._deployDirty ? "primary" : ""}
              ?disabled=${this._deploying}
              @click=${this._deployToAddon}
            >
              ${this._deploying ? "Deploy..." : "Deploy"}
            </button>
            <button
              class=${this._saveDirty ? "primary" : ""}
              ?disabled=${this._saving}
              @click=${this._manualSave}
            >
              ${this._saving ? "Speichern..." : "Speichern"}
            </button>
          </div>
        </header>
        <artnet-led-config-card-editor
          .config=${this._config}
          compact
          ?hide-yaml=${!this._showYaml}
          @config-changed=${this._onConfigChanged}
        ></artnet-led-config-card-editor>
      </section>
    `;
  }

  static styles = css`
    :host {
      display: block;
      padding: 24px;
    }

    .panel {
      display: grid;
      gap: 18px;
    }

    .header {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
    }

    .title {
      font-size: 1.2rem;
      font-weight: 600;
    }

    .subtitle {
      font-size: 0.85rem;
      opacity: 0.7;
    }

    .detail {
      margin-top: 4px;
      font-size: 0.78rem;
      color: var(--error-color, #ff8a80);
      max-width: 560px;
      word-break: break-word;
    }

    .version {
      font-size: 0.7rem;
      opacity: 0.5;
      margin-top: 4px;
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
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

    button[disabled] {
      opacity: 0.6;
      cursor: default;
    }
  `;
}

customElements.define("ha-artnet-led-uiconfig-panel", HaArtnetLedUiConfigPanel);
