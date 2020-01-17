import React from 'react';
import { Link } from '@reach/router';

const ActiveUser = ({ username }) => {
  return (
    <section id="active-user">
      <Link
        to={`/users/${username}`}
        style={{ textDecoration: 'none', color: 'white' }}
      >
        <p>Logged in as: </p>
        <h3>{username}</h3>
      </Link>
    </section>
  );
};

export default ActiveUser;
