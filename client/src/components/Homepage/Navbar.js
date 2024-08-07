import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link to="/" className="logo">PROJECTS</Link>
      <div className="nav-links">
        {location.pathname !== '/' && (
          <Link to="/" className="nav-button">HOME</Link>
        )}
        {location.pathname !== '/add-project' && (
          <Link to="/add-project" className="nav-button">ADD PROJECT</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;