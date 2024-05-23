const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "http://localhost:8080",
            Origin: true,
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
        })
    );
    app.use(
        "/ws",
        createProxyMiddleware({
            target: "http://localhost:8080",
            ws: true,
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
        })
    );
};
