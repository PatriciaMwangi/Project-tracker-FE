import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { loginWithGoogle } from '../../features/auth/AuthActions';
import { Google as GoogleIcon } from '@mui/icons-material';

const GoogleAuthButton = () => {
  const dispatch = useDispatch();

  const handleGoogleLogin = () => {
    dispatch(loginWithGoogle());
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      startIcon={<GoogleIcon />}
      onClick={handleGoogleLogin}
    >
      Sign in with Google
    </Button>
  );
};

export default GoogleAuthButton;
