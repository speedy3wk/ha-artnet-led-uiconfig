import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/index.ts",
  output: {
    file: "../custom_components/ha_artnet_led_uiconfig/frontend/dist/ha-artnet-led-uiconfig.js",
    format: "es",
    sourcemap: true
  },
  plugins: [
    resolve({
      browser: true
    }),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.json"
    }),
    terser()
  ]
};
