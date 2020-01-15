import React from 'react';
import ActiveUser from './ActiveUser';
import { Link } from '@reach/router';
import NavBar from './NavBar';

const Header = ({ activeUser, logOut }) => {
  return (
    <header>
      <NavBar logOut={logOut} />
      <h1>NC News</h1>
      {activeUser ? (
        <ActiveUser username={activeUser} />
      ) : (
        <Link to="/login" style={{ textDecoration: 'none', color: 'black' }}>
          <button>Log In</button>
        </Link>
      )}
    </header>
  );
};

export default Header;
