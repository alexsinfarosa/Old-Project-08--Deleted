/* config-overrides.js */
const { injectBabelPlugin } = require("react-app-rewired");
const rewireMobX = require("react-app-rewire-mobx");
const rewireLess = require("react-app-rewire-less");

module.exports = function override(config, env) {
  // antd design
  config = injectBabelPlugin(
    ["import", { libraryName: "antd", style: true }],
    config
  );
  // change importing css to less
  config = rewireLess.withLoaderOptions({
    // modifyVars: { "@primary-color": "#7FA79E" }
  })(config, env);

  // use the MobX rewire
  config = rewireMobX(config, env);

  return config;
};
