import { useState, useEffect } from 'react';
import api from '../../api/api';

export default function PatientForm({ patient, onClose }) {
  const [email, setEmail] = useState(patient?.email || '');
  const [name, setName] = useState(patient?.name || '');
  const [age, setAge] = useState(patient?.age || '');
  const [deviceId, setDeviceId] = useState(patient?.deviceId || '');

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (patient) {
        await api.put(`/patients/${patient.id}`, { email, name, age, deviceId });
      } else {
        await api.post('/patients', { email, name, age, deviceId });
      }
      onClose();
    } catch (err) {
      alert('Failed to save patient');
    }
  };

  return (
    <div className="modal">
      <h3>{patient ? 'Edit' : 'Add'} Patient</h3>
      <form onSubmit={submit}>
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <input placeholder="Age" type="number" value={age} onChange={e => setAge(e.target.value)} required />
        <input placeholder="Device ID" value={deviceId} onChange={e => setDeviceId(e.target.value)} required />
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}
