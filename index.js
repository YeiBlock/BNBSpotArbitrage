const { log, error } = console;
const socket = require('socket.io');
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const server = app.listen(10000, '0.0.0.0', () =>
  log('Arbitrage Bot has just started on port 10000. Please wait.....')
);

// Set up CORS and static file serving middleware
app.use(cors());
app.use('/JS', express.static(path.join(__dirname, './Pages/JS')));

// Serve the index.html file
app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, './Pages/index.html'));
});

// Create the socket.io instance
const io = socket(server, {
  // Only allow IPv4 connections
  ipv6: false,
});

const arbitrage = require('./arbitrage');

const initialize = async () => {
  await arbitrage.getPairs();
  arbitrage.wsconnect();
};

arbitrage.eventEmitter.on('ARBITRAGE', (pl) => {
  io.sockets.emit('ARBITRAGE', pl);
});

initialize();
