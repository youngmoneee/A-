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
      args[0].title = 'My App';
      return args;
    });
  },
  pwa: {
    name: 'My App',
  },
  pluginOptions: {
    lintStyleOnBuild: true,
    stylelint: {},
  },
};

