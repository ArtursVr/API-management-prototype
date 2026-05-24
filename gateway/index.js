const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const fs = require('fs');
const path = require('path');

const app = express();

// LOG SETUP
const logsDir = path.join(__dirname, 'logs');

if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

const logFile = path.join(logsDir, 'api-gateway.log');

function writeLog(message) {
    const logEntry = `[${new Date().toISOString()}] ${message}\n`;
    fs.appendFileSync(logFile, logEntry);
}

// REQUEST LOGGING MIDDLEWARE
app.use((req, res, next) => {
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;

        writeLog(
            `${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`
        );
    });

    next();
});

// LOGIN
app.get('/login', (req, res) => {
    const userId = req.query.userId;

    if (!userId) {
        writeLog(`LOGIN_FAILED - User ID missing`);
        return res.status(400).json({ error: "User ID required" });
    }

    writeLog(`LOGIN_SUCCESS - token generated for userId=${userId}`);

    res.json({
        token: `Bearer token-${userId}`
    });
});

// AUTH MIDDLEWARE
app.use((req, res, next) => {
    if (req.path === '/login') return next();

    const auth = req.headers['authorization'];

    if (!auth) {
        writeLog(`ACCESS_DENIED ${req.method} ${req.originalUrl} - Token missing`);
        return res.status(401).json({ error: "Token missing" });
    }

    if (!auth.startsWith("Bearer ")) {
        writeLog(`ACCESS_DENIED ${req.method} ${req.originalUrl} - Invalid token format`);
        return res.status(400).json({ error: "Invalid token format" });
    }

    writeLog(`ACCESS_GRANTED ${req.method} ${req.originalUrl}`);

    next();
});

// PROXY
app.use('/api', createProxyMiddleware({
    target: 'http://localhost:3000',
    changeOrigin: true,
    pathRewrite: {
        '^/api': ''
    },
    onError: (err, req, res) => {
        writeLog(`PROXY_ERROR ${req.method} ${req.originalUrl} - ${err.message}`);

        res.status(503).json({
            error: true,
            code: "ORCHESTRATION_SERVICE_UNAVAILABLE",
            message: "Orchestration service is not available"
        });
    }
}));

app.listen(4000, () => {
    console.log("Gateway running on 4000");
    writeLog("API Gateway started on port 4000");
});