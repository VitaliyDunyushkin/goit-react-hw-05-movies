import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function Movies() {
  return (
    <>
      <p>
        <Link to="/">Go home</Link>
      </p>
      <p>movies movies</p>
      <Outlet />
    </>
  );
}
