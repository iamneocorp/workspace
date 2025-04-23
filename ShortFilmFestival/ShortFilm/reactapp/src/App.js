import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar';
import Home from './components/Home';
import AddFilm from './components/AddFilm';
import DisplayFilm from './components/DisplayFilm';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addfilm" element={<AddFilm />} />
          <Route path="/displayfilm" element={<DisplayFilm />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
