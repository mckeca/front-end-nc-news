import './App.css';
import Header from './Components/Header';
import ArticleList from './Components/ArticleList';
import { Router } from '@reach/router';
import UserList from './Components/UserList';
import UserPage from './Components/UserPage';
import ArticlePage from './Components/ArticlePage';
import React, { Component } from 'react';
import LoginPage from './Components/LoginPage';
import NewArticle from './Components/NewArticle';
import ErrorDisplay from './Components/ErrorDisplay';

class App extends Component {
  state = {
    activeUser: 'jessjelly'
  };

  render() {
    const { activeUser } = this.state;
    return (
      <div className="App">
        <Header activeUser={activeUser} logOut={this.logOut} />
        <Router>
          <ArticleList path="/" />
          <LoginPage path="/login" logIn={this.logIn} />
          <ArticleList path="/:topic" />
          <ArticlePage path="/articles/:article" activeUser={activeUser} />
          <UserList path="/users" />
          <UserPage path="/users/:user" activeUser={activeUser} />
          <NewArticle path="/articles/new" activeUser={activeUser} />
          <ErrorDisplay
            default
            err={{ status: 404, data: { msg: 'Page Not Found' } }}
          />
        </Router>
      </div>
    );
  }

  logIn = username => {
    this.setState({ activeUser: username });
  };

  logOut = () => {
    this.setState({ activeUser: '' });
  };
}

export default App;
