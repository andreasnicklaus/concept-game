const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  configureWebpack: { optimization: { minimize: false } },
  transpileDependencies: true,
  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    },
  },
});
