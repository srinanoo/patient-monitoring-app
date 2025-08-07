export default function PatientItem({ patient, onEdit, onDelete }) {
  return (
    <li>
      <strong>{patient.name} (<strong>{patient.email}</strong>)</strong> - Age: {patient.age} - Device: {patient.deviceId}
      <button onClick={() => onEdit(patient)}>Edit</button>
      <button onClick={() => onDelete(patient.id)}>Delete</button>
    </li>
  );
}
