import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/landingpage/landingpage';
import SignUpForm from './components/Auth/Register';
import SignIn from './components/Auth/Login';
import Home from './components/Homepage/Home';
import ProjectForm from './components/Homepage/ProjectForm';
import ProjectDetails from './components/Homepage/ProjectDetails';
import ProjectFormUpdate from './components/Homepage/UpdateProjectForm';
import Invited from './components/Homepage/EmailInvites';
import Dashboard from './components/Admin/Dashboard';
import Profile from './components/Admin/Profile';
import CohortManagement from './components/Admin/CohortManagement';
import Footer from './components/Admin/Footer';
import NavBar from './components/Admin/NavBar';
import Projects from './components/Admin/AdminProjectManagement';
import ForgotPassword from './components/forgotPassword/ForgotPassword';
import ResetPassword from './components/forgotPassword/ResetPassword';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import SingleCohortView from './components/Admin/SingleCohortView';

// Admin Layout Component
const AdminLayout = ({ children }) => (
  <div className='container'>
    <NavBar />
    <div className="container">
      {children}
    </div>
    <Footer />
  </div>
);

// Public Layout Component
const PublicLayout = ({ children }) => (
  <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 15px' }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px' }}>
      {children}
    </div>
  </div>
);


const App = () => {
  return (
    <>
     <Router>
      <Routes>
            {/* Public Routes */}
            <Route path="/reset-password/:token" element={
              <PublicLayout>
                <ResetPassword />
              </PublicLayout>
              } />
            <Route path="/forgot-password" element={
              <PublicLayout>
                <ForgotPassword />
              </PublicLayout>
              } />
            <Route path='/invite-me' element={
              <PublicLayout>
                <Invited/>
              </PublicLayout>
              }/>
            <Route path="/project/update/:id" element={
              <PublicLayout>
                <ProjectFormUpdate/>
              </PublicLayout>
              }/>
            <Route path="/" element={
              <PublicLayout>
                <LandingPage />
              </PublicLayout>
              } />
            <Route path="/home" element={
              <PublicLayout>
                <Home />
              </PublicLayout>
              } />
            <Route path="/signup" element={
              <PublicLayout>
                <SignUp />
              </PublicLayout>
              } />
            <Route path="/signin" element={
              <PublicLayout>
                <SignInPage />
              </PublicLayout>
              } />
            <Route path="/projects/new" element={
              <PublicLayout>
                <ProjectForm />
              </PublicLayout>
              } />
            <Route path="/project/:id" element={
              <PublicLayout>
                <ProjectDetails />
              </PublicLayout>
              } />
            {/* Protected Routes (for logged-in users) */}
            <Route path='/dashboard' element={
            <ProtectedRoute>
              <PublicLayout>
                <Dashboard />
              </PublicLayout>
            </ProtectedRoute>
          } />
            {/* Admin Protected Routes */}
            <Route path='/admin-dashboard' element={
            <ProtectedRoute requireAdmin={true}>
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path='/cohorts' element={
            <ProtectedRoute requireAdmin={true}>
              <AdminLayout>
                <CohortManagement />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path='/single-cohort/:id' element={
            <ProtectedRoute>
              <AdminLayout>
                <SingleCohortView/>
              </AdminLayout>
            </ProtectedRoute>
            }/>
          <Route path='projects' element={
            <ProtectedRoute requireAdmin={true}>
              <AdminLayout>
                <Projects />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path='/profile' element={
            <ProtectedRoute requireAdmin={true}>
              <AdminLayout>
                <Profile />
              </AdminLayout>
            </ProtectedRoute>
          } />
          </Routes>
    </Router>    
    </>
  );
};

const SignUp = () => (
  <>
    <SignUpForm />
  </>
);

const SignInPage = () => (
  <>
    <SignIn />
  </>
);

export default App;
