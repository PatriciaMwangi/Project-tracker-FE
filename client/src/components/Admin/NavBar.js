import React from 'react';
import { NavLink } from 'react-router-dom';
// import './Navbar.css';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
      <NavLink className="navbar-brand" to="/admin-dashboard">Admin Dashboard</NavLink>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/cohorts">Cohorts</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/projects">Projects</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/profile">Profile</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};


export default NavBar;

