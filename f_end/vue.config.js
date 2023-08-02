module.exports = {
  lintOnSave: true,
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~@/assets/scss/_variables.scss";',
      },
    },
  },
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = 'A-';
      return args;
    });
  },
  pwa: {
    name: 'A-',
  },
  pluginOptions: {
    lintStyleOnBuild: true,
    stylelint: {},
  },
};
