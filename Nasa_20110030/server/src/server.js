const express = require('express');
const cors = require('cors');
const http = require('http');
const { loadPlanetsData } = require('./models/planets.model');

const app = require('./app');

app.use(cors({
    origin: 'http://localhost:3000',
}));
const PORT = 8000;

const server = http.createServer(app);
  
async function startServer() {
    try {
        await loadPlanetsData();
        server.listen(PORT, () => {
            console.log(`Listening on PORT: ${PORT}...`);
        });
    } catch (error) {
        console.error('Error starting the server:', error);
    }
}
startServer();
