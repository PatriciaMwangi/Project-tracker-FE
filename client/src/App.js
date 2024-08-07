import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/landingpage/landingpage';
import { Container } from '@mui/material';
import SignUpForm from './components/Auth/Register';
import SignIn from './components/Auth/Login';
import GoogleAuthButton from './components/Auth/GoogleAuthButton';
import AdminDashboard from './components/Admin/AdminDashboard';
import Home from './components/Home';
import ProjectForm from './components/Homepage/ProjectForm';

const App = () => {
  return (
    <Router>
      <Container maxWidth="sm">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="adminadashboard" element={<AdminDashboard/>} />
          <Route path="ProjectForm" element={<ProjectForm />} />
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

