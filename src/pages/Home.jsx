import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [query, setQuery] = useState([]);

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
      'https://api.themoviedb.org/3/trending/all/day?language=en-US',
      options
    )
      .then(response => response.json())
      .then(response => {
        console.log(response);
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
            <Link to={`movies/${id}`}>{name || title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
