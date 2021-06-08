// eslint-disable-next-line @typescript-eslint/no-var-requires
const satellite = require("@algolia/satellite/cjs/styles/tailwind.config.js");

module.exports = {
  presets: [satellite],
  prefix: satellite.prefix,
  purge: satellite.purge,
  borderRadius: {
    DEFAULT: satellite.theme.borderRadius.default,
  },
  borderWidth: {
    DEFAULT: satellite.theme.borderWidth.default,
  },
};
