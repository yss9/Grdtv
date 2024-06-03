const { createProxyMiddleware } = require("http-proxy-middleware");

const proxyConfig = {
    target: "http://localhost:8080",
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
        proxyReq.setHeader('Origin', 'http://localhost:3000');
        proxyReq.setHeader('withCredentials', 'true');
    },
    onProxyRes: (proxyRes, req, res) => {
        if (proxyRes.headers) {
            proxyRes.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000';
            proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
        }
    }
};

module.exports = (app) => {
    app.use("/api", createProxyMiddleware(proxyConfig));
    app.use("/ws", createProxyMiddleware({ ...proxyConfig, ws: true }));
};
