const http = require('http');
const express = require('express');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT ?? 3000;
const app = express();

app.get("/", (req, res) => {
    const filePath = path.join(__dirname, 'index.html');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading index.html file:", err);
            res.status(500).send("Internal Server Error");
        } else {
            res.set('Content-Type', 'text/html');
            res.send(data);
        }
    });
});

app.get('/hello', (req, res) => { res.json({ message: 'Hello World!' }); });
app.get('/health', (req, res) => { res.json({ message: 'Health of CI/CD pipeline is good!' }); });

// Create server with Express app
const server = http.createServer(app);

// Start the server
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
