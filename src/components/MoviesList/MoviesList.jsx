import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function MoviesList({ moviesList, state }) {
  return moviesList.map(({ id, name, title }) => (
    <li key={id}>
      <Link to={`/movies/${id}`} state={state}>
        {name || title}
      </Link>
    </li>
  ));
}

MoviesList.propTypes = {
  moviesList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string,
      title: PropTypes.string,
    }).isRequired
  ).isRequired,

  state: PropTypes.exact({ from: PropTypes.object.isRequired }).isRequired,
};
