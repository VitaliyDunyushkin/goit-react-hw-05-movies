import React, { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

// import css from './Layout.css';

export default function Layout() {
  return (
    <>
      <header>
        <nav>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/movies">Movies</NavLink>
          </li>
        </nav>
      </header>
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
}
