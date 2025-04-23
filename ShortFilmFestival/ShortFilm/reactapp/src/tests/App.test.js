import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import Home from '../components/Home';
import Footer from '../components/Footer';
import AddFilm from '../components/AddFilm';
import DisplayFilm from '../components/DisplayFilm';

describe('App Component and Routing', () => {
  test('renders App with header navigation links', () => {
    render(<App />);

    const homeLink = screen.getByText(/Home/i);
    const addFilmLink = screen.getByText(/Add Film/i);
    const displayFilmLink = screen.getByText(/Display Films/i);

    expect(homeLink).toBeInTheDocument();
    expect(addFilmLink).toBeInTheDocument();
    expect(displayFilmLink).toBeInTheDocument();
  });

  test('navigates to Add Film component on click', () => {
    render(<App />);

    const addFilmLink = screen.getByText(/Add Film/i);
    fireEvent.click(addFilmLink);

    const formHeading = screen.getByText(//i);
    expect(formHeading).toBeInTheDocument();
  });

  test('navigates to Display Films component on click', () => {
    render(<App />);

    const displayFilmLink = screen.getByText(/Display Films/i);
    fireEvent.click(displayFilmLink);

    const tableHeading = screen.getByText(/Short Films at the Festival/i);
    expect(tableHeading).toBeInTheDocument();
  });
});

describe('AddFilm Component', () => {
  test('renders form input fields and labels', () => {
    render(<AddFilm />);

    const titleLabel = screen.getByLabelText(/Film Title:/i);
    const directorLabel = screen.getByLabelText(/Director Name:/i);
    const durationLabel = screen.getByLabelText(/Duration \(minutes\):/i);
    const synopsisLabel = screen.getByLabelText(/Synopsis:/i);
    const genreLabel = screen.getByLabelText(/Genre:/i);
    const voteCountLabel = screen.getByLabelText(/Vote Count:/i);

    expect(titleLabel).toBeInTheDocument();
    expect(directorLabel).toBeInTheDocument();
    expect(durationLabel).toBeInTheDocument();
    expect(synopsisLabel).toBeInTheDocument();
    expect(genreLabel).toBeInTheDocument();
    expect(voteCountLabel).toBeInTheDocument();
  });
});

describe('DisplayFilm Component', () => {
  test('fetches and displays films on mount', async () => {
    const mockFilms = [
      {
        id: 1,
        title: 'Sample Film 1',
        genre: 'Drama',
        duration: 90,
        director: 'Jane Doe',
        synopsis: 'A dramatic story.',
        voteCount: 120,
      },
      {
        id: 2,
        title: 'Sample Film 2',
        genre: 'Comedy',
        duration: 75,
        director: 'John Smith',
        synopsis: 'A hilarious adventure.',
        voteCount: 85,
      },
    ];

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => mockFilms,
    });

    render(<DisplayFilm />);

    await waitFor(() => {
      expect(screen.getByText('Sample Film 1')).toBeInTheDocument();
      expect(screen.getByText('Drama')).toBeInTheDocument();
      expect(screen.getByText('90 mins')).toBeInTheDocument();
      expect(screen.getByText('Jane Doe')).toBeInTheDocument();
      expect(screen.getByText('A dramatic story.')).toBeInTheDocument();
      expect(screen.getByText('120')).toBeInTheDocument();

      expect(screen.getByText('Sample Film 2')).toBeInTheDocument();
      expect(screen.getByText('Comedy')).toBeInTheDocument();
      expect(screen.getByText('75 mins')).toBeInTheDocument();
      expect(screen.getByText('John Smith')).toBeInTheDocument();
      expect(screen.getByText('A hilarious adventure.')).toBeInTheDocument();
      expect(screen.getByText('85')).toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/films'),
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    global.fetch.mockRestore();
  });
});
