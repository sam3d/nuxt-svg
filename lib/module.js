const defaultConfig = require("./config");

/**
 * This is the original RegExp cloned from the original Nuxt.js configuration
 * files, with only the search for ".svg" files removed. Keep tabs on this in
 * case the core decides to add additional qualifiers to the pattern.
 */
const ORIGINAL_TEST = /\.(png|jpe?g|gif|svg|webp|avif)$/i;
const ORIGINAL_TEST_OLD_NUXT = /\.(png|jpe?g|gif|svg|webp)$/i;
const REPLACEMENT_TEST = /\.(png|jpe?g|gif|webp|avif)$/i;

module.exports = function (moduleOptions) {
  this.extendBuild((config, ctx) => {
    setup(config, moduleOptions, ctx);
  });
};

/**
 * Perform the primary setup for the nuxt-svg module by removing and replacing
 * all of the rules that match ".svg" with the new one.
 *
 * @param config The webpack configuration object to extend
 * @param moduleOptions The module options, either an object or a function taking the webpack context as param
 * @param ctx The webpack context
 */
function setup(config, moduleOptions, ctx) {
  const options = Object.assign(
    {},
    defaultConfig(ctx),
    typeof moduleOptions === "function" ? moduleOptions(ctx) : moduleOptions
  );

  const { name } = options;

  const rules = config.module.rules;

  // Remove any original svg rules.
  const svgRules = rules.filter((rule) => rule.test && rule.test.test(".svg"));

  for (const rule of svgRules) {
    if (
      rule.test.source !== ORIGINAL_TEST.source &&
      rule.test.source !== ORIGINAL_TEST_OLD_NUXT.source &&
      rule.test.source !== REPLACEMENT_TEST.source
    ) {
      throw new Error(
        "nuxt-svg: Unexpected '.svg' rule in the webpack configuration"
      );
    }
    rule.test = REPLACEMENT_TEST;
  }

  const vueSvgLoader = [
    {
      loader: "vue-svg-loader",
      options: { svgo: false },
    },
  ];

  if (config.name !== "server") {
    const jsxRule = config.module.rules.find((r) => r.test.test(".jsx"));
    const babelLoader = jsxRule.use[jsxRule.use.length - 1];
    vueSvgLoader.unshift(babelLoader);
  }

  /**
   * Create the custom rule that supports multiple resource queries. By default,
   * use file-loader (no resource query supplied).
   */
  const rule = {
    test: /\.svg$/i,
    oneOf: [
      {
        resourceQuery: /inline/,
        use: vueSvgLoader,
      },
      {
        resourceQuery: /data/,
        use: {
          loader: "url-loader",
          options: { esModule: false },
        },
      },
      {
        resourceQuery: /raw/,
        use: {
          loader: "raw-loader",
          options: { esModule: false },
        },
      },
      {
        use: {
          loader: "file-loader",
          options: { esModule: false, name },
        },
      },
    ],
  };

  rules.push(rule); // Add the rule to the configuration.
}

module.exports.meta = require("../package.json");
