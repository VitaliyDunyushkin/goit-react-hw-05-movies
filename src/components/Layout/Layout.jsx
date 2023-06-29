import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import css from './Layout.css';

export default function Layout() {
  return (
    <>
      <header>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/movies">Movies</NavLink>
          </li>
        </ul>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
