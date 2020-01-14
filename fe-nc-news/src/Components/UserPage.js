import React, { Component } from 'react';
import { getData, getUser } from '../api';
import ArticleCard from './ArticleCard';

class UserPage extends Component {
  state = {
    user: {},
    articles: [],
    isLoading: true
  };

  componentDidMount() {
    Promise.all([
      getUser(this.props.user),
      getData('articles', undefined, this.props.user)
    ]).then(([{ user }, { articles }]) => {
      this.setState({ user, articles, isLoading: false });
    });
  }

  render() {
    const { user, articles, isLoading } = this.state;
    return isLoading ? (
      <p>Loading</p>
    ) : (
      <main>
        <img src={user.avatar_url} alt={user.username} />
        <h3>{user.name}</h3>
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
