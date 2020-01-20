import React, { Component } from 'react';
import ActiveUser from './ActiveUser';
import { Link } from '@reach/router';
import NavBar from './NavBar';

class Header extends Component {
  state = {
    showNavBar: false
  };
  render() {
    const { activeUser } = this.props;
    const { showNavBar } = this.state;
    return (
      <header>
        <section id="menu-btn">
          <button onClick={this.toggleNavBar}>
            {showNavBar ? 'X' : 'Menu'}
          </button>
        </section>
        {showNavBar && (
          <NavBar
            logOut={this.closeMenuOnLogOut}
            toggleNavBar={this.toggleNavBar}
          />
        )}
        <h1>NC News</h1>
        <section id="current-user">
          {activeUser ? (
            <ActiveUser username={activeUser} />
          ) : (
            <Link
              to="/login"
              style={{ textDecoration: 'none', color: 'white' }}
              id="login-btn"
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

  closeMenuOnLogOut = () => {
    const { logOut } = this.props;
    logOut();
    this.toggleNavBar();
  };
}

export default Header;
