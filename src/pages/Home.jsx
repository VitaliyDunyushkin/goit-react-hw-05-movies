import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { getTrendMovies } from 'api/getTrendMovies';
import MoviesList from '../components/MoviesList';

export default function Home() {
  const [query, setQuery] = useState([]);
  const location = useLocation();

  useEffect(() => {
    getTrendMovies()
      .then(response => {
        return setQuery(response.results);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Trending movies:</h1>
      <ul>
        <MoviesList moviesList={query} state={{ from: location }} />
      </ul>
    </div>
  );
}
