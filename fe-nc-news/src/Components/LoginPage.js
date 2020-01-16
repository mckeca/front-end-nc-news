import React, { Component } from 'react';
import { getData } from '../api';
import { navigate } from '@reach/router';

class LoginPage extends Component {
  state = { username: 'tickle122', users: [], isLoading: true, err: null };

  componentDidMount() {
    getData('users')
      .then(({ users }) => {
        this.setState({ users, isLoading: false });
      })
      .catch(({ response }) => {
        this.setState({ err: response, isLoading: false });
      });
  }

  render() {
    const { isLoading, users } = this.state;
    return isLoading ? (
      <p>Loading...</p>
    ) : (
      <form id="login-form" onSubmit={this.handleSubmit}>
        {this.state.invalidUser && <p>Invalid username</p>}
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
    event.preventDefault();
    this.props.logIn(this.state.username);
    navigate('/');
  };
}

export default LoginPage;
