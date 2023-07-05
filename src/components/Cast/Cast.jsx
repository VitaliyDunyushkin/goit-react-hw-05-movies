import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getMovieCast } from 'api/getMovieCast';

export default function Cast() {
  const { movieId } = useParams();
  const BASE_POSTER_URL = 'https://image.tmdb.org/t/p/w500/';

  const [cast, setCast] = useState([]);

  useEffect(() => {
    getMovieCast(movieId)
      .then(response => {
        setCast(response.cast || []);
      })
      .catch(err => console.error(err));
  }, [movieId]);

  return (
    <>
      <ul>
        {cast.length > 0
          ? cast.map(actor => (
              <li key={actor.cast_id}>
                <h3>{actor.name}</h3>
                <p>character: {actor.character}</p>
                <img
                  src={BASE_POSTER_URL + actor.profile_path || 'no photo'}
                  alt={actor.name}
                  width={200}
                />
              </li>
            ))
          : 'Ooops ... no cast info'}
      </ul>
    </>
  );
}
