import React, { Component } from 'react';
import ActiveUser from './ActiveUser';
import { Link } from '@reach/router';
import NavBar from './NavBar';

class Header extends Component {
  state = {
    showNavBar: false
  };
  render() {
    const { activeUser, logOut } = this.props;
    const { showNavBar } = this.state;
    return (
      <header>
        <section id="menu-btn">
          <button onClick={this.toggleNavBar}>
            {showNavBar ? 'X' : '...'}
          </button>
        </section>
        {showNavBar && (
          <NavBar logOut={logOut} toggleNavBar={this.toggleNavBar} />
        )}
        <h1>NC News</h1>
        <section id="current-user">
          {activeUser ? (
            <ActiveUser username={activeUser} />
          ) : (
            <Link
              to="/login"
              style={{ textDecoration: 'none', color: 'black' }}
            >
              <button>Log In</button>
            </Link>
          )}
        </section>
      </header>
    );
  }

  toggleNavBar = () => {
    this.setState(currentState => {
      return { showNavBar: !currentState.showNavBar };
    });
  };
}

export default Header;
