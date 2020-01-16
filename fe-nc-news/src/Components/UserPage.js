import React, { Component } from 'react';
import { getData, getUser } from '../api';
import ArticleCard from './ArticleCard';
import { Link } from '@reach/router';
import ErrorDisplay from './ErrorDisplay';

class UserPage extends Component {
  state = {
    user: {},
    articles: [],
    isLoading: true,
    err: null
  };

  componentDidMount() {
    Promise.all([
      getUser(this.props.user),
      getData('articles', undefined, this.props.user)
    ])
      .then(([{ user }, { articles }]) => {
        this.setState({ user, articles, isLoading: false });
      })
      .catch(({ response }) => {
        this.setState({ err: response, isLoading: false });
      });
  }

  render() {
    const { user, articles, isLoading, err } = this.state;
    if (err) return <ErrorDisplay err={err} />;
    return isLoading ? (
      <p>Loading</p>
    ) : (
      <main>
        <img src={user.avatar_url} alt={user.username} />
        <h3>{user.name}</h3>
        {this.props.activeUser === user.username && (
          <Link
            id="new-article-btn"
            to="/articles/new"
            style={{ textDecoration: 'none', color: 'white' }}
          >
            New Article
          </Link>
        )}
        <ul>
          {articles.map(article => {
            return <ArticleCard key={article.article_id} article={article} />;
          })}
        </ul>
      </main>
    );
  }
}

export default UserPage;
