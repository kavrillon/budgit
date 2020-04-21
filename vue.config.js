// eslint-disable-next-line
const path = require('path');

module.exports = {
  chainWebpack: config => {
    config.entry('app').clear().add('./app/main.ts').end();
    config.resolve.alias.set('@app', path.join(__dirname, './app'));
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@app': path.resolve(__dirname, 'app/'),
        '@libs': path.resolve(__dirname, 'libs/'),
        '@tests': path.resolve(__dirname, 'tests/'),
        '@types': path.resolve(__dirname, '@types/'),
      },
    },
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@app/assets/scss/abstract.scss";`,
      },
    },
  },
  devServer: {
    proxy: {
      '^/api/boards': {
        target: 'http://127.0.0.1:8080/',
        secure: false,
        changeOrigin: false,
        pathRewrite: path => path.replace('/api/boards', 'data/boards.json'),
      },
    },
  },
};
