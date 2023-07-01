import React, { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import css from './Layout.module.css';

export default function Layout() {
  return (
    <div className={css.container}>
      <header>
        <nav className={css.navigation}>
          <li>
            <NavLink to="/" className={css.link}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/movies" className={css.link}>
              Movies
            </NavLink>
          </li>
        </nav>
      </header>
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}
