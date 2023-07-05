import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getMovieReviews } from 'api/getMovieReviews';

export default function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getMovieReviews(movieId)
      .then(response => {
        setReviews(response.results || []);
      })
      .catch(err => console.error(err));
  }, [movieId]);

  return (
    <>
      <ul>
        {reviews.length > 0
          ? reviews.map(review => (
              <li key={review.id}>
                <h3>Author: {review.author}</h3>
                <p>{review.content}</p>
              </li>
            ))
          : 'Ooops ... no reviews'}
      </ul>
    </>
  );
}
