const { defineConfig } = require('@vue/cli-service');
const path = require('path');
const themePath = path.join(__dirname, './src/theme.less');

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            hack: `true; @import "${themePath}";`,
          },
        },
      },
    },
  },
});
