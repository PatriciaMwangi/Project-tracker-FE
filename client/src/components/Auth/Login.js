import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { FaHome, FaLock } from 'react-icons/fa';
import { setUser } from '../../features/auth/AuthSlice';
import GoogleAuthButton from './GoogleAuthButton';
import './Auth.css';

const API_URL = 'https://project-tracker-be-jwpt.onrender.com';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);  // Start loading state

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Response data:', data);

        if (data.access_token) {
          localStorage.setItem('access_token', data.access_token);
          console.log('Access token saved:', data.access_token);

          dispatch(setUser({ user: data.user, isAdmin: data.user.is_admin }));

          if (data.user.is_admin) {
            navigate('/admin-dashboard');
          } else {
            navigate('/home');
          }
        } else {
          setError('Login successful but no access token was provided.');
          console.error('No access token found in response');
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed. Please try again.');
        console.error('Login failed:', errorData.message || 'Unknown error');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again later.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);  // End loading state
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
          {error && <div className="error-message">{error}</div>} {/* Display error message */}
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
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
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
