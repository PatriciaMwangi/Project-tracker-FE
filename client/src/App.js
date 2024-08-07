import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import LandingPage from './components/landingpage/landingpage';
import SignUpForm from './components/Auth/Register';
import SignIn from './components/Auth/Login';
import GoogleAuthButton from './components/Auth/GoogleAuthButton';
import AdminDashboard from './components/Admin/AdminDashboard';
import Home from './components/Homepage/Home';
import ProjectForm from './components/Homepage/ProjectForm';
import ProjectDetails from './components/Homepage/ProjectDetails';

const App = () => {
  return (
    <Router>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/projects/new" element={<ProjectForm />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
          </Routes>
        </Box>
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
