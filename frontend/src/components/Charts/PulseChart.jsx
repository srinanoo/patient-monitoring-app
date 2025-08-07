import { Line } from 'react-chartjs-2';

export default function PulseChart({ vitalsList }) {
  const data = {
    labels: vitalsList.map(v => new Date(v.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: 'Pulse',
        data: vitalsList.map(v => v.pulse),
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
    ],
  };

  return (
    <div style={{ width: '80%', margin: '20px 0' }}>
      <h3>Pulse Over Time</h3>
      <Line data={data} options={{ maintainAspectRatio: true }} />
    </div>
  );
}
