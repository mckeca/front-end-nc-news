import React, { Component } from 'react';
import { Link } from '@reach/router';
import * as api from '../api';
import ErrorDisplay from './ErrorDisplay';

class NavBar extends Component {
  state = { topics: [], isLoading: true, err: null };

  componentDidMount() {
    api
      .getList('topics')
      .then(({ topics }) => {
        this.setState({ topics, isLoading: false });
      })
      .catch(({ response }) => {
        this.setState({ err: response, isLoading: false });
      });
  }

  render() {
    const { topics, isLoading, err } = this.state;
    const { logOut, toggleNavBar } = this.props;
    if (err) return <ErrorDisplay err={err} />;
    return (
      <ul id="nav-bar">
        <li
          key="all"
          className="nav-button"
          onClick={() => {
            toggleNavBar();
          }}
        >
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            ALL
          </Link>
        </li>
        {isLoading ? (
          <li key="loading">Fetching Topics...</li>
        ) : (
          topics.map(topic => {
            return (
              <li
                key={topic.slug}
                className="topic-button"
                onClick={() => {
                  toggleNavBar();
                }}
              >
                <Link
                  to={`/${topic.slug}`}
                  style={{ textDecoration: 'none', color: 'white' }}
                >
                  {topic.slug.toUpperCase()}
                </Link>
              </li>
            );
          })
        )}
        <li key="divider">|</li>
        <li>
          <button onClick={logOut}>Log Out</button>
        </li>
      </ul>
    );
  }
}

export default NavBar;
