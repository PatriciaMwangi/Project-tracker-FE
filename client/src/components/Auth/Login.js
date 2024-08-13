import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { FaHome, FaLock } from 'react-icons/fa';
import { setUser } from '../../features/auth/AuthSlice';
import GoogleAuthButton from './GoogleAuthButton'; // Import GoogleAuthButton
import './Auth.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        const response = await fetch('https://project-tracker-be-bs7w.onrender.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();

            // Dispatch the user data to Redux store
            dispatch(setUser({ user: data.user, isAdmin: data.isAdmin }));

            // Navigate based on the user's role
            if (data.isAdmin) {
                navigate('/admin-dashboard');
            } else {
                navigate('/home');
            }
        } else {
            console.error('Login failed');
        }
    } catch (error) {
        console.error('Error:', error);
    }
  };

  return (
    <div className="auth-container">
      <button className="home-icon" onClick={() => navigate('/')}>
        <FaHome />
      </button>
      <div className="auth-box">
        <div className="auth-image" />
        <div className="auth-form">
          <div className="avatar">
            <FaLock />
          </div>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              id="email"
              placeholder="Email Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              id="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>
              <input
                type="checkbox"
                value="remember"
              />
              Remember me
            </label>
            <button type="submit">Sign In</button>
            <div className="links">
              <Link to="#">Forgot password?</Link>
              <Link to="/signup">Don't have an account? Sign Up</Link>
            </div>
            <div className="google-auth-container">
              <GoogleAuthButton /> {/* Add GoogleAuthButton here */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;