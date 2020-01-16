import React, { Component } from 'react';
import { Link } from '@reach/router';
import { getData } from '../api';
import ErrorDisplay from './ErrorDisplay';

class NavBar extends Component {
  state = { topics: [], isLoading: true, err: null };

  componentDidMount() {
    getData('topics')
      .then(({ topics }) => {
        this.setState({ topics, isLoading: false });
      })
      .catch(({ response }) => {
        this.setState({ err: response, isLoading: false });
      });
  }

  render() {
    const { topics, isLoading, err } = this.state;
    if (err) return <ErrorDisplay err={err} />;
    return (
      <ul id="nav-bar">
        <li key="all" className="nav-button">
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            ALL
          </Link>
        </li>
        {isLoading ? (
          <li key="loading">Fetching Topics...</li>
        ) : (
          topics.map(topic => {
            return (
              <li key={topic.slug} className="topic-button">
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
          <button onClick={this.props.logOut}>Log Out</button>
        </li>
      </ul>
    );
  }
}

export default NavBar;
