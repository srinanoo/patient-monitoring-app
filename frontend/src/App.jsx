import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './app.css';

import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Layout/Navbar';
import PrivateRoute from './components/Layout/PrivateRoute';

import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import PatientList from './components/Patients/PatientList';
import VitalsDashboard from './components/Dashboard/VitalsDashboard';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/patients"
            element={
              <PrivateRoute>
                <PatientList />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <VitalsDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <PatientList />
              </PrivateRoute>
            }
          />
        </Routes>
        <ToastContainer position="top-right" autoClose={5000} />
      </Router>
    </AuthProvider>
  );
}
