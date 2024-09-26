const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      changeOrigin: true,
    })
  );
};