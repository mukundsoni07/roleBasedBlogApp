import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import './Register.css';

const Register = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('user');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const API_URL = import.meta.env.VITE_API_URL

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        if (!fullName || !email || !password || !role) {
            setError('All fields are required');
            return;
        }

        try {
            const res = await fetch(`${API_URL}/api/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fullName, email, password, role }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || 'Registration failed');
            } else {
                login(data);
                localStorage.setItem('user', JSON.stringify(data));
                navigate('/');
            }
        } catch (err) {
            setError('Server error. Try again.');
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleRegister} className="register-form">
                <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>

                {error && <p className="error-text">{error}</p>}

                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
