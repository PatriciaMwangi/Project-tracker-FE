import React from 'react';
import { useDispatch } from 'react-redux';
import { loginWithGoogle } from '../../features/auth/AuthActions';
import { FcGoogle } from 'react-icons/fc'; // Import Google icon from react-icons
import './Auth.css'; // Ensure CSS is imported

const GoogleAuthButton = () => {
  const dispatch = useDispatch();

  const handleGoogleLogin = () => {
    dispatch(loginWithGoogle());
  };

  return (
    <button
      className="google-auth-button"
      onClick={handleGoogleLogin}
    >
      <FcGoogle
        className="google-icon"
        size={24} // Adjust size as needed
      />
      Sign in with Google
    </button>
  );
};

export default GoogleAuthButton;
