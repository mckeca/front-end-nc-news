import React from 'react';
import './App.css';
import Header from './Components/Header';
import ArticleList from './Components/ArticleList';
import NavBar from './Components/NavBar';
import { Router } from '@reach/router';
import UserList from './Components/UserList';
import UserPage from './Components/UserPage';
import ArticlePage from './Components/ArticlePage';

function App() {
  return (
    <div className="App">
      <Header />
      <NavBar />
      <Router>
        <ArticleList path="/" />
        <ArticleList path="/:topic" />
        <ArticlePage path="/articles/:article" />
        <UserList path="/users" />
        <UserPage path="/users/:user" />
      </Router>
    </div>
  );
}

export default App;
