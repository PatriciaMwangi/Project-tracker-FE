import React from 'react';
import { Link } from 'react-router-dom';
import { Link as RouterLink} from 'react-router-dom';
import  './Header.css'

function Header() {
  return (
    <header className="header">
      <h1 className="header-title">AN IMPRESSIVE PROJECT MANAGEMENT APP TO BOOST PRODUCTIVITY</h1>
      <div className="buttons-container">
        <Link component={RouterLink} to="/signup" className="button">
        Sign Up
        </Link>
        <Link component = {RouterLink} to="/signin" className="button">
        sign In
        </Link>
      </div>
    </header>
  );
}

export default Header;
