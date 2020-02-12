const proxy = require('http-proxy-middleware');

module.exports = (app) => {
    app.use('/api', proxy({
        target: 'localhost:3000',
        changeOrigin: true,
    }));
};