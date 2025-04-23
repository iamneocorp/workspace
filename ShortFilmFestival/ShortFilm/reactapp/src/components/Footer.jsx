import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Short Film Festival. All rights reserved.</p>
      <p>Made with 🎬 and ❤️ for film lovers everywhere.</p>
    </footer>
  );
};

export default Footer;
