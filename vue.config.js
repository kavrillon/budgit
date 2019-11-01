module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/scss/abstract.scss";`
      }
    }
  }
};
