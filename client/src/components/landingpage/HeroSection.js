import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <img src="https://cdn.dorik.com/66bf34110856a0001e5f2bd4/images/photo1579389082947e54d8e911928-8GE9i.jpeg" alt="Hero Background" className="hero-image" />
      <div className="hero-content">
        <h1>Easily track your projects' progress online</h1>
        <p>PROJECT TRACKING SYSTEM</p>
      </div>
      <div className="button-container">
        <button
          className="primary-button"
          onClick={() => navigate('/signup')}  // Navigate to Sign Up
        >
          Sign Up
        </button>
        <button
          className="secondary-button"
          onClick={() => navigate('/signin')}  // Navigate to Login
        >
          Login
        </button>
      </div>
    </section>
  );
}

export default HeroSection;
