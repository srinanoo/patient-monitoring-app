import { useState } from 'react';
import api from '../../api/api';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Nurse');

  const submit = async (e) => {
    e.preventDefault();
    try {
        const response = await api.post('/auth/register', { email, password, role });
        if(response.data?.success === false)
            toast.error(response.data.error);
        else {
            toast.success('Registered successfully! Please login.');
            navigate('/login');
        }
    } catch (err) {
        console.log(err);
        if (err?.response?.status === 404) {
            toast.error(err.response.data.error);
        } else {
            toast.error("Unable to register");
        }
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={submit}>
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option>Nurse</option>
          <option>Doctor</option>
        </select>
        <button type="submit">Register</button>
      </form>
      <p>Already have account? <Link to="/login">Login here</Link></p>
    </div>
  );
}
