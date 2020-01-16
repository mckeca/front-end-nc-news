import React, { Component } from 'react';
import { Link } from '@reach/router';
import { getData } from '../api';

class NavBar extends Component {
  state = { topics: [] };

  componentDidMount() {
    getData('topics').then(({ topics }) => {
      this.setState({ topics });
    });
  }

  render() {
    const { topics } = this.state;
    return (
      <ul id="nav-bar">
        <li key="all" className="nav-button">
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            ALL
          </Link>
        </li>
        {topics.map(topic => {
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
        })}
        <li key="divider">|</li>
        <li>
          <button onClick={this.props.logOut}>Log Out</button>
        </li>
      </ul>
    );
  }
}

export default NavBar;
