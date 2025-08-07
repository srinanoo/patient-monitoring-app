import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import PatientItem from './PatientItem';
import PatientForm from './PatientForm';

const limit = 1;

export default function PatientList() {
  const [patients, setPatients] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPatients, setTotalPatients] = useState(0);
  const [editingPatient, setEditingPatient] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchPatients = async (pageNum = 1) => {
    try {
      const res = await api.get(`/patients?page=${pageNum}&limit=${limit}`);
      console.log(res.data.data.total);
      setPatients(res?.data?.data?.data);
      setTotalPatients(res?.data?.data?.total);
      setPage(pageNum);
    } catch (err) {
    //   alert('Failed to fetch patients');
    }
  };

  useEffect(() => {
    fetchPatients(page);
  }, []);

  const onEdit = (patient) => {
    setEditingPatient(patient);
    setShowForm(true);
  };

  const onDelete = async (id) => {
    if (window.confirm('Delete this patient?')) {
      await api.delete(`/patients/${id}`);
      fetchPatients();
    }
  };

  const onFormClose = () => {
    setShowForm(false);
    setEditingPatient(null);
    fetchPatients(page);
  };

  const totalPages = Math.ceil(totalPatients / limit);

  return (
    <div style={{ padding: 20 }}>
      <h2>Patients</h2>
      <div style={{"marginBottom": "20px"}}><button onClick={() => setShowForm(true)}>Add Patient</button></div>
      {showForm && (
        <PatientForm patient={editingPatient} onClose={onFormClose} />
      )}
      {patients?.length>0 && (
        <>
            <ul>
                {patients.map((p) => (
                <PatientItem key={p.id} patient={p} onEdit={onEdit} onDelete={onDelete} />
                ))}
            </ul>
            <div className="pagination">
                Page: {page} / {totalPages}
                <button onClick={() => fetchPatients(page - 1)} disabled={page <= 1}>Prev</button>
                <button onClick={() => fetchPatients(page + 1)} disabled={page >= totalPages}>Next</button>
            </div>
        </>
      )}
    </div>
  );
}
