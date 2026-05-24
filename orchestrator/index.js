const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const app = express();

// LOG SETUP
const logsDir = path.join(__dirname, 'logs');

if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

const logFile = path.join(logsDir, 'orchestration.log');

function writeLog(message) {
    const logEntry = `[${new Date().toISOString()}] ${message}\n`;
    fs.appendFileSync(logFile, logEntry);
}

app.get('/student/full-info/:id', async (req, res) => {
    const id = req.params.id;

    writeLog(`REQUEST_STARTED GET /student/full-info/${id}`);

    try {
        const statusRes = await axios.get(`http://localhost:3001/status/${id}`);

        let paymentData;

        try {
            const paymentRes = await axios.get(`http://localhost:3002/payment/${id}`);
            paymentData = paymentRes.data;

            writeLog(`PAYMENT_SERVICE_SUCCESS studentId=${id}`);
        } catch (error) {
            paymentData = { error: "Payment not available" };

            writeLog(
                `PAYMENT_SERVICE_ERROR studentId=${id} - ${error.message}`
            );
        }

        writeLog(`REQUEST_SUCCESS studentId=${id}`);

        res.json({
            student: statusRes.data,
            payment: paymentData
        });

    } catch (error) {
        writeLog(`STATUS_SERVICE_ERROR studentId=${id} - ${error.message}`);

        res.status(500).json({
            error: "Student not found"
        });
    }
});

app.listen(3000, () => {
    console.log("Orchestration running on 3000");
    writeLog("Orchestration service started on port 3000");
});