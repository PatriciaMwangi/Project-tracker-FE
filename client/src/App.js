import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/landingpage/landingpage';
import { Container } from '@mui/material';
import SignUpForm from './components/Auth/Register';
import SignIn from './components/Auth/Login';
import GoogleAuthButton from './components/Auth/GoogleAuthButton';

const App = () => {
  return (
    <Router>
      <Container maxWidth="sm">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignInPage />} />
        </Routes>
      </Container>
    </Router>
  );
};

const SignUp = () => (
  <>
    <SignUpForm />
        <GoogleAuthButton />
  </>
);

const SignInPage = () => ( 
  <>
    <SignIn /> 
  </>
);

export default App;

