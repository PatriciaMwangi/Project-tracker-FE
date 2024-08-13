// Navbar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaPlusCircle, FaProjectDiagram } from 'react-icons/fa';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar bg-purple-600 p-4 shadow-md">
      <Link to="/" className="logo text-white font-bold text-xl flex items-center gap-2">
        <FaProjectDiagram />
        PROJECTS
      </Link>
      <div className="nav-links flex gap-4">
        {location.pathname !== '/' && (
          <Link to="/home" className="nav-button bg-white text-purple-600 px-4 py-2 rounded-md flex items-center gap-2">
            <FaHome />
            HOME
          </Link>
        )}
        {location.pathname !== '/add-project' && (
          <Link to="/projects/new" className="nav-button bg-white text-purple-600 px-4 py-2 rounded-md flex items-center gap-2">
            <FaPlusCircle />
            ADD PROJECT
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;