import React, { useEffect, useState } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';

import { getSearchMovies } from 'api/getSearchMovies';
import MoviesList from '../components/MoviesList';

export default function Movies() {
  const [moviesList, setMoviesList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const query = searchParams.get('query');

  useEffect(() => {
    if (query === null) {
      return;
    }
    getSearchMovies(query)
      .then(response => {
        setMoviesList(response.results);
      })
      .catch(err => console.error(err));
  });

  return (
    <>
      <form
        onSubmit={event => {
          event.preventDefault();

          setSearchParams({ query: event.target.elements.search.value });
          event.target.elements.search.value = '';
        }}
      >
        <input type="text" name="search" placeholder="Lets search movies" />
        <button type="submit">Search</button>
      </form>

      <ul>
        <MoviesList moviesList={moviesList} state={{ from: location }} />
      </ul>
    </>
  );
}
