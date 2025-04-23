import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        🎬 Short Film Festival
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/addfilms">AddFilms</Link></li>
        <li><Link to="/displayfilms">DisplayFilms</Link></li>
        
      </ul>
    </nav>
  );
};

export default Navbar;
