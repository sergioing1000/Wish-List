// src/setupProxy.js
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  // Proxy middleware configuration
  const proxyConfig = {
    target: "https://wish-list-bay.vercel.app", // Your API server URL
    changeOrigin: true, // Needed for virtual hosted sites
    secure: false, // Don't verify SSL certificates
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
    // Optional: modify the path before sending to the target
    pathRewrite: {
      "^/api": "/api", // Removes /api from the URL if your backend doesn't expect it
    },
    // Optional: handle proxy errors
    onError: (err, req, res) => {
      res.writeHead(500, {
        "Content-Type": "text/plain",
      });
      res.end("Proxy error: " + err);
    },
    // Optional: modify the proxy request before sending
    onProxyReq: (proxyReq, req, res) => {
      // You can modify headers here if needed
      // proxyReq.setHeader('x-custom-header', 'custom-value');
    },
  };

  // Apply the proxy middleware to routes starting with /api
  app.use("/api", createProxyMiddleware(proxyConfig));

  // You can add multiple proxy configurations if needed
  // Example for a different API endpoint:
  /*
    app.use(
        '/auth',
        createProxyMiddleware({
            target: 'https://auth-server.com',
            changeOrigin: true,
            secure: false
        })
    );
    */
};
