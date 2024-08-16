import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { FaHome, FaLock } from 'react-icons/fa';
import { setUser } from '../../features/auth/AuthSlice';
import GoogleAuthButton from './GoogleAuthButton';
import { auth, googleProvider, signInWithPopup, GoogleAuthProvider } from '../../FirebaseConfig';
import './Auth.css';

const API_URL = 'https://project-tracker-be-bs7w.onrender.com';

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
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, is_admin: isAdmin }),
      });

      if (response.ok) {
        const data = await response.json();
        const { user, accessToken } = data;

        localStorage.setItem('accessToken', accessToken);

        dispatch(setUser({ user, isAdmin: user.is_admin }));

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

  const LoginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
  
      const email = user.email || (user.providerData.length > 0 && user.providerData[0].email);
      if (!email) {
        setError("Google sign-in failed: No email associated with the account");
        return;
      }
  
      const response = await fetch(`${API_URL}/userByEmail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
      });
  
      let data;
  
      if (response.ok) {
        data = await response.json();
      } else if (response.status === 404) {
        // Attempt to register the user if not found
        const registerResponse = await fetch(`${API_URL}/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            username: user.displayName,
            email,
            is_admin: false,
          }),
        });
  
        if (!registerResponse.ok) {
          const errorData = await registerResponse.json();
          setError(`Error: ${errorData.message}`);
          return;
        }
  
        data = await registerResponse.json();
      } else {
        setError('Failed to fetch user or register.');
        return;
      }
  
      localStorage.setItem('accessToken', data.accessToken);
      dispatch(setUser(data.user));
      navigate('/home');
      
    } catch (error) {
      console.error('Google sign-in failed:', error);
      setError(`Google sign-in failed: ${error.message}`);
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
              <GoogleAuthButton onClick={LoginWithGoogle} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
