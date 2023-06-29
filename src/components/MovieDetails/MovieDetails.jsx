import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

// import css from './MovieDetails.css';

export default function MovieDetails() {
  const { movieId } = useParams();
  const BASE_POSTER_URL = 'https://image.tmdb.org/t/p/w500/';

  const [movieInfo, setMovieInfo] = useState({
    poster_path: '',
    title: '',
    genres: [],
    overview: '',
    vote_average: 0,
  });
  console.log(movieInfo);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNmY0OTNkZTM3N2Q0OWFlMjJiYjI0OGE1OTlhZTQzMyIsInN1YiI6IjY0OWM1NGFhOTYzODY0MDExZGE4ZmExNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AraQa6sw5Xc4jMFmOF5nTNm9FYUuccfqZCYZiwyPdHw',
      },
    };

    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
      options
    )
      .then(response => response.json())
      .then(response => {
        console.log(response);
        setMovieInfo({
          poster_path: response.poster_path,
          title: response.title,
          genres: response.genres,
          overview: response.overview,
          vote_average: response.vote_average,
        });
      })
      .catch(err => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <p>
        <Link to="/">Go home</Link>
      </p>
      <img
        src={BASE_POSTER_URL + movieInfo.poster_path}
        alt={movieInfo.title}
        width={200}
      />
      <h1>{movieInfo.title}</h1>
      <p>User score: {Math.round(movieInfo.vote_average * 10)}%</p>
      <h2>Overview</h2>
      <p>{movieInfo.overview}</p>
      <h2>Genres</h2>
      <p>{movieInfo.genres.flatMap(item => item.name).join(', ')}</p>

      <h3>Additional information</h3>
      <ul>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>
    </>
  );
}
