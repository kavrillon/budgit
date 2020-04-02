module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/scss/abstract.scss";`,
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
