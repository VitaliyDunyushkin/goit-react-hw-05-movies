import React, { useEffect, useRef, useState, Suspense } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';

import { getMovieDetails } from 'api/getMovieDetails';

export default function MovieDetails() {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkLocationRef = useRef(location.state?.from ?? '/movies');
  const BASE_POSTER_URL = 'https://image.tmdb.org/t/p/w500/';

  const [movieInfo, setMovieInfo] = useState({
    poster_path: '',
    release_date: '',
    title: '',
    genres: [],
    overview: '',
    vote_average: 0,
  });

  useEffect(() => {
    getMovieDetails(movieId)
      .then(response => {
        const {
          poster_path,
          release_date = '',
          title = 'no info',
          genres = [{ name: 'no info' }],
          overview = 'no info',
          vote_average,
        } = response;
        setMovieInfo({
          poster_path: poster_path,
          release_date: release_date,
          title: title,
          genres: genres,
          overview: overview,
          vote_average: vote_average,
        });
      })
      .catch(err => console.error(err));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <p>
        <Link to={backLinkLocationRef.current}>{`<<<< Go back`}</Link>
      </p>
      <img
        src={BASE_POSTER_URL + movieInfo.poster_path}
        alt={movieInfo.title}
        width={200}
      />
      <h1>
        {movieInfo.title + ' (' + movieInfo.release_date.slice(0, 4) + ')'}
      </h1>
      <p>User score: {Math.round(movieInfo.vote_average * 10) || ''}%</p>
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
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
}
