import { LitElement, css, html } from "lit";
import { property } from "lit/decorators.js";
import "./panel";

export class HaArtnetLedUiConfigCard extends LitElement {
  @property({ attribute: false }) public hass?: any;
  @property({ attribute: false }) public config?: Record<string, unknown>;

  public setConfig(config: Record<string, unknown>) {
    this.config = config;
  }

  public getCardSize() {
    return 6;
  }

  protected render() {
    return html`
      <ha-card class="card">
        <ha-artnet-led-uiconfig-panel .hass=${this.hass}></ha-artnet-led-uiconfig-panel>
      </ha-card>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }

    .card {
      overflow: hidden;
    }

    ha-artnet-led-uiconfig-panel {
      display: block;
    }
  `;
}

customElements.define("ha-artnet-led-uiconfig-card", HaArtnetLedUiConfigCard);
customElements.define("ha-artnet-led-uiconfig", HaArtnetLedUiConfigCard);

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: "ha-artnet-led-uiconfig",
  name: "Art-Net LED UI Config",
  description: "WYSIWYG editor for ha-artnet-led inside a Lovelace card."
});
