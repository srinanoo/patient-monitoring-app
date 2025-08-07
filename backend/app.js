require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const patientRoutes = require('./routes/patient.routes');
const ingestRoutes = require('./routes/ingestion.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/ingest', ingestRoutes);

module.exports = app;
