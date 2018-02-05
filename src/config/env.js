module.exports = {
  defaultTitle: 'Budg\'It',
  serverPort: process.env.PORT || 8080,
  apiPort: process.env.API_PORT || 4000,
  isProd: process.env.NODE_ENV === 'production',
  useMicroCache: process.env.MICRO_CACHE !== 'false'
};
