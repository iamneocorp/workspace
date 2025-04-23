import React, { useState } from 'react';
import './AddFilm.css';

const AddFilm = () => {
  const initialFormData = {
    title: '',
    director: '',
    duration: '',
    synopsis: '',
    genre: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.title) {
      errors.title = 'Title is required';
      isValid = false;
    }

    if (!formData.director) {
      errors.director = 'Director name is required';
      isValid = false;
    }

    if (!formData.duration || isNaN(formData.duration) || formData.duration <= 0) {
      errors.duration = 'Valid duration is required';
      isValid = false;
    }

    if (!formData.synopsis) {
      errors.synopsis = 'Synopsis is required';
      isValid = false;
    }

    if (!formData.genre) {
      errors.genre = 'Genre is required';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await fetch('https://8080-edffdadacccdaf326831678aababaebabeone.premiumproject.examly.io/api/films', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ...formData, duration: parseInt(formData.duration), voteCount: 0 })
        });

        if (response.ok) {
          setIsSuccessModalOpen(true);
          setFormData(initialFormData);
        } else {
          console.error('Failed to submit the film.');
        }
      } catch (error) {
        console.error('Error while posting film:', error);
      }
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  return (
    <div className="add-film">
      <h2>Submit a Short Film</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="title">Film Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
          {errors.title && <div className="error">{errors.title}</div>}
        </div>
        <div>
          <label htmlFor="director">Director Name:</label>
          <input
            type="text"
            id="director"
            name="director"
            value={formData.director}
            onChange={handleInputChange}
            required
          />
          {errors.director && <div className="error">{errors.director}</div>}
        </div>
        <div>
          <label htmlFor="duration">Duration (minutes):</label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            required
          />
          {errors.duration && <div className="error">{errors.duration}</div>}
        </div>
        <div>
          <label htmlFor="synopsis">Synopsis:</label>
          <textarea
            id="synopsis"
            name="synopsis"
            rows="4"
            value={formData.synopsis}
            onChange={handleInputChange}
            required
          />
          {errors.synopsis && <div className="error">{errors.synopsis}</div>}
        </div>
        <div>
          <label htmlFor="genre">Genre:</label>
          <select
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a genre</option>
            <option value="Drama">Drama</option>
            <option value="Comedy">Comedy</option>
            <option value="Thriller">Thriller</option>
            <option value="Romance">Romance</option>
            <option value="Animation">Animation</option>
            <option value="Documentary">Documentary</option>
          </select>
          {errors.genre && <div className="error">{errors.genre}</div>}
        </div>
        <div>
          <button type="submit">Submit Film</button>
        </div>
      </form>

      {isSuccessModalOpen && (
        <div className="success-modal">
          <p>Film submitted successfully!</p>
          <button onClick={closeSuccessModal}>Close</button>
        </div>
      )}
    </div>
  );
};

export default AddFilm;
