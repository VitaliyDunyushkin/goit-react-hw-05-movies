import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { getTrendMovies } from 'api/getTrendMovies';

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
        {query.map(({ id, name, title }) => (
          <li key={id}>
            <Link to={`movies/${id}`} state={{ from: location }}>
              {name || title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
