import { Route, Routes } from 'react-router-dom';

import Layout from './Layout';
import Home from 'pages/Home';
import Movies from 'pages/Movies';
import MovieDetails from './MovieDetails';
import Cast from './Cast';
import Reviews from './Cast';

export const App = () => {
  return (
    <Routes>
      <Route path="/goit-react-hw-05-movies" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/goit-react-hw-05-movies/movies" element={<Movies />}>
          <Route
            path="/goit-react-hw-05-movies/movies/:movieId"
            element={<MovieDetails />}
          >
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};
