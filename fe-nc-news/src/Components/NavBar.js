import React, { Component } from 'react';
import { Link } from '@reach/router';
import { getData } from '../api';

class NavBar extends Component {
  state = { hideNavBar: true, topics: [] };

  componentDidMount() {
    getData('topics').then(({ topics }) => {
      this.setState({ topics });
    });
  }

  render() {
    const { hideNavBar, topics } = this.state;
    return hideNavBar ? (
      <button onClick={this.toggleNavBar}>Menu</button>
    ) : (
      <section>
        <button onClick={this.toggleNavBar}>Close</button>
        <ul id="nav-bar">
          <li key="all" className="nav-button">
            <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
              ALL
            </Link>
          </li>
          {topics.map(topic => {
            return (
              <li key={topic.slug} className="topic-button">
                <Link
                  to={`/${topic.slug}`}
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  {topic.slug.toUpperCase()}
                </Link>
              </li>
            );
          })}
          <li key="divider">|</li>
          <li key="users-button" id="users-button">
            <Link
              to="/users"
              style={{ textDecoration: 'none', color: 'black' }}
            >
              USERS
            </Link>
          </li>

          <li>
            <button onClick={this.props.logOut}>Log Out</button>
          </li>
        </ul>
      </section>
    );
  }

  toggleNavBar = () => {
    this.setState(currentState => {
      return { hideNavBar: !currentState.hideNavBar };
    });
  };
}

export default NavBar;
