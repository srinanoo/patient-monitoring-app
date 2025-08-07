import React, { useEffect, useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NORMAL_RANGES } from '../../utils/vitalsThresholds';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Legend,
  Tooltip,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Legend, Tooltip);

export default function VitalsDashboard() {
  const [vitalsData, setVitalsData] = useState([]);
  const vitalsHistory = useRef({}); // store history per patient

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:4000/');

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.type === 'vitalsUpdate') {
        setVitalsData(msg.data);
        handleAbnormalVitals(msg.data);
        storeVitalsHistory(msg.data);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => ws.close();
  }, []);

  const handleAbnormalVitals = (data) => {
    data.forEach(({ name, pulse, systolic, diastolic, o2sat }) => {
      if (pulse < NORMAL_RANGES.pulse[0] || pulse > NORMAL_RANGES.pulse[1])
        toast.warn(`${name}: Abnormal Pulse (${pulse})`);
      if (systolic < NORMAL_RANGES.systolic[0] || systolic > NORMAL_RANGES.systolic[1])
        toast.warn(`${name}: Abnormal Systolic (${systolic})`);
      if (diastolic < NORMAL_RANGES.diastolic[0] || diastolic > NORMAL_RANGES.diastolic[1])
        toast.warn(`${name}: Abnormal Diastolic (${diastolic})`);
      if (o2sat < NORMAL_RANGES.o2sat[0])
        toast.error(`${name}: Low O₂ Saturation (${o2sat}%)`);
    });
  };

  const storeVitalsHistory = (data) => {
    data.forEach((v) => {
      if (!vitalsHistory.current[v.patientId]) {
        vitalsHistory.current[v.patientId] = [];
      }
      vitalsHistory.current[v.patientId].push({
        timestamp: v.timestamp,
        pulse: v.pulse,
        systolic: v.systolic,
        diastolic: v.diastolic,
        o2sat: v.o2sat,
      });

      // keep only last 10 records
      if (vitalsHistory.current[v.patientId].length > 10) {
        vitalsHistory.current[v.patientId].shift();
      }
    });
  };

  const renderChart = (patientId, label, field, color) => {
    const history = vitalsHistory.current[patientId] || [];
    const labels = history.map((v) => new Date(v.timestamp).toLocaleTimeString());
    const data = history.map((v) => v[field]);

    return (
      <div style={{ width: '100%', maxWidth: 500 }}>
        <h4>{label}</h4>
        <Line
          data={{
            labels,
            datasets: [
              {
                label: label,
                data,
                fill: false,
                backgroundColor: color,
                borderColor: color,
              },
            ],
          }}
        />
      </div>
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Live Patient Vitals</h2>
      <ToastContainer />
      <table border="1" cellPadding="6" style={{ marginBottom: 40, width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Pulse</th>
            <th>Systolic</th>
            <th>Diastolic</th>
            <th>O₂ Sat</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {
            vitalsData?.length === 0
                ?
                <>Loading...</>
                :
          vitalsData.map((v) => (
            <tr key={v.id}>
              <td>{v.id}</td>
              <td>{v.name}</td>
              <td>{v.pulse}</td>
              <td>{v.systolic}</td>
              <td>{v.diastolic}</td>
              <td>{v.o2sat}%</td>
              <td>{new Date(v.timestamp).toLocaleTimeString()}</td>
            </tr>
          ))
          }
        </tbody>
      </table>

      {vitalsData.map((v) => (
        <div key={v.patientId} style={{ marginBottom: 60 }}>
          <h3>{v.name}</h3>
          <div className='vitalChartContainer'>
            {renderChart(v.patientId, 'Pulse', 'pulse', 'blue')}
            {renderChart(v.patientId, 'Systolic', 'systolic', 'green')}
            {renderChart(v.patientId, 'Diastolic', 'diastolic', 'orange')}
            {renderChart(v.patientId, 'O₂ Saturation', 'o2sat', 'red')}
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
}
