const express = require('express');
const path = require('path');
const cron = require('node-cron');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args)); // Dynamic import

const app = express();

// ======== SET YOUR RENDER PING URL BELOW ======== //
const pingURL = 'https://kintanherba.onrender.com'; // <== PUT YOUR PING URL HERE

// Define the port and domain
const port = process.env.PORT || 3000;
const domain = process.env.DOMAIN || 'http://localhost';

// Serve static files
app.use(express.static(__dirname));

// Log domain
console.log(`Website will be deployed at ${domain}:${port}`);

// Fallback to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on ${domain}:${port}`);
});

// ======== CRON JOB TO PING RENDER URL EVERY 10 MINS ======== //
cron.schedule('*/10 * * * *', async () => {
  try {
    const response = await fetch(pingURL);
    console.log(`Auto-ping sent to ${pingURL} at ${new Date().toISOString()}`);
  } catch (err) {
    console.error('Ping failed:', err.message);
  }
});
