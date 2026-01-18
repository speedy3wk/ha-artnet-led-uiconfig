import { load } from "js-yaml";
import {
  ArtnetLedCardConfig,
  ChannelSetup,
  DeviceConfig,
  EMPTY_CONFIG,
  NodeConfig,
  UniverseConfig
} from "./types";

const indent = (level: number) => "  ".repeat(level);

const pushLine = (lines: string[], level: number, text: string) => {
  lines.push(`${indent(level)}${text}`);
};

const pushOptional = (lines: string[], level: number, key: string, value: unknown) => {
  if (value === undefined || value === null || value === "") {
    return;
  }
  pushLine(lines, level, `${key}: ${value}`);
};

const pushChannelSetup = (lines: string[], level: number, value: ChannelSetup | undefined) => {
  if (value === undefined || value === null) {
    return;
  }
  if (Array.isArray(value)) {
    pushLine(lines, level, "channel_setup:");
    value.forEach((item) => {
      pushLine(lines, level + 1, `- ${item}`);
    });
    return;
  }
  pushLine(lines, level, `channel_setup: ${value}`);
};

const renderDevice = (lines: string[], device: DeviceConfig) => {
  pushLine(lines, 5, `- channel: ${device.channel}`);
  pushLine(lines, 6, `name: ${device.name}`);
  pushOptional(lines, 6, "type", device.type);
  pushOptional(lines, 6, "transition", device.transition);
  pushOptional(lines, 6, "output_correction", device.output_correction);
  pushOptional(lines, 6, "channel_size", device.channel_size);
  pushOptional(lines, 6, "byte_order", device.byte_order);
  pushOptional(lines, 6, "min_temp", device.min_temp);
  pushOptional(lines, 6, "max_temp", device.max_temp);
  pushChannelSetup(lines, 6, device.channel_setup);
};

const renderUniverse = (lines: string[], universe: UniverseConfig) => {
  pushLine(lines, 4, `${universe.id}:`);
  pushOptional(lines, 5, "send_partial_universe", universe.send_partial_universe);
  pushOptional(lines, 5, "output_correction", universe.output_correction);
  pushLine(lines, 5, "devices:");
  universe.devices.forEach((device) => renderDevice(lines, device));
};

const renderNode = (lines: string[], node: NodeConfig) => {
  pushLine(lines, 1, "- platform: artnet_led");
  pushLine(lines, 2, `host: ${node.host}`);
  pushOptional(lines, 2, "port", node.port);
  pushOptional(lines, 2, "max_fps", node.max_fps);
  pushOptional(lines, 2, "refresh_every", node.refresh_every);
  pushOptional(lines, 2, "node_type", node.node_type);
  pushLine(lines, 2, "universes:");
  node.universes.forEach((universe) => renderUniverse(lines, universe));
};

export const toArtnetYaml = (config: ArtnetLedCardConfig): string => {
  const lines: string[] = [];
  pushLine(lines, 0, "light:");
  config.nodes.forEach((node) => renderNode(lines, node));
  return lines.join("\n");
};

const asNumber = (value: unknown, fallback: number | undefined = undefined) => {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const normalizeDevice = (device: Record<string, unknown>): DeviceConfig => {
  return {
    channel: asNumber(device.channel, 1) ?? 1,
    name: String(device.name ?? ""),
    type: device.type ? String(device.type) : undefined,
    transition: asNumber(device.transition),
    output_correction: device.output_correction ? String(device.output_correction) : undefined,
    channel_size: device.channel_size ? String(device.channel_size) : undefined,
    channel_setup: device.channel_setup as ChannelSetup | undefined,
    byte_order: device.byte_order ? String(device.byte_order) : undefined,
    min_temp: device.min_temp ? String(device.min_temp) : undefined,
    max_temp: device.max_temp ? String(device.max_temp) : undefined
  };
};

const normalizeUniverse = (id: number, universe: Record<string, unknown>): UniverseConfig => {
  const devices = Array.isArray(universe.devices)
    ? universe.devices.map((device) => normalizeDevice(device as Record<string, unknown>))
    : [];
  return {
    id,
    send_partial_universe:
      universe.send_partial_universe !== undefined
        ? Boolean(universe.send_partial_universe)
        : undefined,
    output_correction: universe.output_correction
      ? String(universe.output_correction)
      : undefined,
    devices
  };
};

const normalizeNode = (node: Record<string, unknown>): NodeConfig => {
  const universesValue = node.universes ?? {};
  const universes: UniverseConfig[] = Array.isArray(universesValue)
    ? (universesValue as Array<Record<string, unknown>>).map((universe, index) =>
        normalizeUniverse(asNumber(universe.id, index) ?? index, universe)
      )
    : Object.entries(universesValue as Record<string, unknown>).map(([key, value]) =>
        normalizeUniverse(asNumber(key, 0) ?? 0, (value ?? {}) as Record<string, unknown>)
      );

  return {
    host: String(node.host ?? ""),
    port: asNumber(node.port),
    max_fps: asNumber(node.max_fps),
    refresh_every: asNumber(node.refresh_every),
    node_type: node.node_type ? String(node.node_type) : undefined,
    universes
  };
};

export const fromArtnetYaml = (yaml: string): ArtnetLedCardConfig => {
  if (!yaml.trim()) {
    return { ...EMPTY_CONFIG, nodes: [] };
  }
  const data = load(yaml) as Record<string, unknown> | undefined;
  const lights = data?.light;
  if (!Array.isArray(lights)) {
    return { ...EMPTY_CONFIG, nodes: [] };
  }

  const nodes = (lights as Array<Record<string, unknown>>)
    .filter((entry) => !entry.platform || entry.platform === "artnet_led")
    .map((entry) => normalizeNode(entry));

  return {
    type: EMPTY_CONFIG.type,
    title: "",
    nodes
  };
};
