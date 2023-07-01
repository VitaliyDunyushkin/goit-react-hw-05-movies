import React, { useEffect, useState, Suspense } from 'react';
import { Outlet, Link, useSearchParams, useLocation } from 'react-router-dom';

export default function Movies() {
  const [moviesList, setMoviesList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const query = searchParams.get('query');

  useEffect(() => {
    if (query === null) {
      return;
    }
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNmY0OTNkZTM3N2Q0OWFlMjJiYjI0OGE1OTlhZTQzMyIsInN1YiI6IjY0OWM1NGFhOTYzODY0MDExZGE4ZmExNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AraQa6sw5Xc4jMFmOF5nTNm9FYUuccfqZCYZiwyPdHw',
      },
    };

    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
      options
    )
      .then(response => response.json())
      .then(response => {
        // console.log(response);
        setMoviesList(response.results);
      })
      .catch(err => console.error(err));
  });

  return (
    <>
      <p>
        <Link to={location.state?.from ?? '/'}>Go back</Link>
      </p>
      <form
        onSubmit={event => {
          event.preventDefault();
          // console.log(event.target.elements.search.value);
          setSearchParams({ query: event.target.elements.search.value });
          event.target.elements.search.value = '';
        }}
      >
        <input type="text" name="search" placeholder="Lets search movies" />
        <button type="submit">Search</button>
      </form>

      <ul>
        {moviesList.map(({ id, name, title }) => (
          <li key={id}>
            <Link to={`${id}`} state={{ from: location }}>
              {name || title}
            </Link>
          </li>
        ))}
      </ul>

      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
}
