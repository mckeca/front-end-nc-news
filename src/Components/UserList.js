import React, { Component } from 'react';
import * as api from '../api';
import { Link } from '@reach/router';

class UserList extends Component {
  state = {
    users: [],
    isLoading: true
  };

  componentDidMount() {
    api.getList('users').then(({ users }) => {
      this.setState({ users, isLoading: false });
    });
  }

  render() {
    const { users, isLoading } = this.state;
    return (
      <main>
        {isLoading ? (
          <p>Loading</p>
        ) : (
          <ul id="user-list">
            {users.map(user => {
              return (
                <li key={user.username} className="user-card">
                  <Link
                    to={`${user.username}`}
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
                    <img src={user.avatar_url} alt={`${user.username}`} />
                    <p>{user.username}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </main>
    );
  }
}

export default UserList;
