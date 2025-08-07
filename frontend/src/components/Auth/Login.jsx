import React, { useState, useContext } from 'react';
import api from '../../api/api';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
        const response = await api.post('/auth/login', { email, password });
        if(response.data?.success === false)
            toast.error(response.data.error);
        else {
            login(response?.data?.data);
            toast.success('Logged in successfully!');
            navigate('/patients');
        }
    } catch (err) {
        if (err?.response?.status === 404 || err?.response?.status === 400) {
            toast.error(err.response.data.error);
        } else {
            toast.error("Login failed");
        }
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={submit}>
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      <p>Don't have account? <Link to="/register">Register here</Link></p>
    </div>
  );
}
