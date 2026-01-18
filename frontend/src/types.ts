export type ChannelSetup = string | Array<string | number>;

export interface DeviceConfig {
  channel: number;
  name: string;
  type?: string;
  transition?: number;
  output_correction?: string;
  channel_size?: string;
  channel_setup?: ChannelSetup;
  byte_order?: string;
  min_temp?: string;
  max_temp?: string;
}

export interface UniverseConfig {
  id: number;
  send_partial_universe?: boolean;
  output_correction?: string;
  devices: DeviceConfig[];
}

export interface NodeConfig {
  host: string;
  port?: number;
  max_fps?: number;
  refresh_every?: number;
  node_type?: string;
  universes: UniverseConfig[];
}

export interface ArtnetLedCardConfig {
  type: string;
  title?: string;
  nodes: NodeConfig[];
}

export const EMPTY_CONFIG: ArtnetLedCardConfig = {
  type: "ha_artnet_led_uiconfig",
  title: "",
  nodes: []
};
