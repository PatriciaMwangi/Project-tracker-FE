import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { FaHome, FaLock } from 'react-icons/fa';
import { setUser } from '../../features/auth/AuthSlice';
import GoogleAuthButton from './GoogleAuthButton'; // Import GoogleAuthButton
import './Auth.css';

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError('Username, Email, and Password must be provided');
      return;
    }

    setError('');

    try {
      const response = await fetch('https://project-tracker-be-bs7w.onrender.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, is_admin: isAdmin }),
      });

      if (response.ok) {
        const data = await response.json();
        const { user, accessToken } = data;

        // Save access token to local storage
        localStorage.setItem('accessToken', accessToken);

        // Dispatch the user data to Redux store
        dispatch(setUser({ user, isAdmin: user.is_admin }));

        // Navigate based on the user's role
        if (user.is_admin) {
          navigate('/admin-dashboard');
        } else {
          navigate('/home');
        }
      } else {
        const errorData = await response.json();
        setError(`Error: ${errorData.msg}`);
      }
    } catch (error) {
      setError('Sign up failed. Please try again.');
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
          <h1>Sign Up</h1>
          {error && <div className="error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="username"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
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
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
              Admin
            </label>
            <button type="submit">Sign Up</button>
            <div className="links">
              <Link to="/signin">Already have an account? Sign In</Link>
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

export default SignUpForm;