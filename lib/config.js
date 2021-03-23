const defaultConfig = ({ isDev }) => ({
  name: isDev ? "[name].[ext]" : "img/[name].[contenthash:7].[ext]",
});

module.exports = defaultConfig;
