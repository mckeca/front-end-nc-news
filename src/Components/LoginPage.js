import React, { Component } from 'react';
import * as api from '../api';
import { navigate } from '@reach/router';

class LoginPage extends Component {
  state = { username: 'tickle122', users: [], isLoading: true, err: null };

  componentDidMount() {
    api
      .getList('users')
      .then(({ users }) => {
        this.setState({ users, isLoading: false });
      })
      .catch(({ response }) => {
        this.setState({ err: response, isLoading: false });
      });
  }

  render() {
    const { isLoading, users, invalidUser } = this.state;
    return isLoading ? (
      <p>Loading...</p>
    ) : (
      <form id="login-form" onSubmit={this.handleSubmit}>
        {invalidUser && <p>Invalid username</p>}
        <label>
          Log in as:
          <select onChange={this.handleChange}>
            {users.map(user => {
              return (
                <option key={user.username} value={user.username}>
                  {user.username}
                </option>
              );
            })}
          </select>
        </label>
        <button type="submit">Log In</button>
      </form>
    );
  }

  handleChange = ({ target }) => {
    this.setState({ username: target.value });
  };

  handleSubmit = event => {
    const { logIn } = this.props;
    const { username } = this.state;
    event.preventDefault();
    logIn(username);
    navigate('/');
  };
}

export default LoginPage;
