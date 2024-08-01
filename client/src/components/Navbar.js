import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>PROJECTS</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/add-project">Add Project</Link>
      </div>
    </nav>
  );
}

export default Navbar;
