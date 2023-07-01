import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// import css from './Cast.css';

export default function Cast() {
  const { movieId } = useParams();
  const BASE_POSTER_URL = 'https://image.tmdb.org/t/p/w500/';

  const [cast, setCast] = useState([]);

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
      `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
      options
    )
      .then(response => response.json())
      .then(response => {
        // console.log(response);
        setCast(response.cast);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <p>Cast info</p>
      <ul>
        {cast.map(actor => (
          <li key={actor.cast_id}>
            <h3>{actor.name}</h3>
            <p>character: {actor.character}</p>
            <img
              src={BASE_POSTER_URL + actor.profile_path || 'no photo'}
              alt={actor.name}
              width={200}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
