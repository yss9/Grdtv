const { createProxyMiddleware } = require("http-proxy-middleware");

// 환경 변수 또는 기본값을 사용하여 백엔드 URL 설정
const backendUrl = process.env.BACKEND_URL ||
    (process.env.NODE_ENV === 'production' ? "http://backend:8080" : "http://localhost:8080");

const proxyConfig = {
    target: backendUrl, // 환경에 맞는 백엔드 URL 사용
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
};
