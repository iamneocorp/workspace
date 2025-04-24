import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div
      className="home-container"
      style={{ backgroundImage: `url(/images/bracelets-6470300_1280.jpg)` }} // assumes image is in public/images
    >
      <h2>Welcome to the Short Film Festival!</h2>
      <div className="shop-info">
        <h3>Location:</h3>
        <p>Film Avenue, Cine City</p>
        <p>Lights, Camera, Action - 2025</p>
      </div>
    </div>
  );
};

export default Home;
