const app = require('./app');
const db = require('./models');
const sequelize = require('sequelize');

const PORT = process.env.PORT || 4000;

const http = require('http');
const { WebSocketServer } = require('ws');

const server = http.createServer(app);
// Create WebSocket server
const wss = new WebSocketServer({ server });

const sendVitals = async () => {
  try {
    const latestVitals = await db.Vitals.findAll({
      include: [{ model: db.Patient, attributes: ['name'] }],
      group: ['patientId', 'Patient.id', 'Vitals.id'],
      order: [['timestamp', 'DESC']],
    });

    const payload = latestVitals.map(v => ({
      id: v.id,
      name: v.Patient.name,
      pulse: v.pulse,
      systolic: v.systolic,
      diastolic: v.diastolic,
      o2sat: v.o2sat,
      timestamp: v.timestamp,
    }));

    const message = JSON.stringify({ type: 'vitalsUpdate', data: payload });
    console.log(message);

    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(message);
      }
    });
  } catch (err) {
    console.error('Error sending vitals:', err);
  }
};

wss.on('connection', (ws) => {
  console.log('WebSocket client connected');

  // Example: send mock vitals every 5 seconds
  const interval = setInterval(sendVitals, 5000);

  ws.on('close', () => {
    console.log('Client disconnected');
    clearInterval(interval);
  });
});

db.sequelize.sync().then(() => {
  console.log('DB Connected');
  server.listen(PORT, () => console.log(`🚀 Server on http://localhost:${PORT}`));
});
