import React, { useState, useEffect } from 'react';
import placeholderImage from '../assets/displayimage.jpg';
import './DisplayFilm.css';

const DisplayFilm = () => {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    async function fetchFilms() {
      try {
        const response = await fetch('https://8080-edffdadacccdaf327263024aababaebabethree.premiumproject.examly.io/api/films', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        if (response.ok) {
          const data = await response.json();
          setFilms(data);
        } else {
          console.error('Failed to fetch films');
        }
      } catch (error) {
        console.error('Error while fetching films:', error);
      }
    }

    fetchFilms();
  }, []);

  return (
    <div className="film-display-container">
      <h2>Short Films at the Festival</h2>
      <table className="film-table">
        <thead>
          <tr>
            <th>Poster</th>
            <th>Title</th>
            <th>Genre</th>
            <th>Duration</th>
            <th>Director</th>
            <th>Release Date</th>
          </tr>
        </thead>
        <tbody>
          {films.map((film) => (
            <tr key={film.id}>
              <td><img src={placeholderImage} alt="Film Poster" className="film-poster" /></td>
              <td>{film.title}</td>
              <td>{film.genre}</td>
              <td>{film.duration} mins</td>
              <td>{film.director}</td>
              <td>{film.releaseDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayFilm;
