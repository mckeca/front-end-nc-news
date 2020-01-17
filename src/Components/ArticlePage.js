import React, { Component } from 'react';
import { getArticle } from '../api';
import { formatDates } from '../utils';
import CommentList from './CommentList';
import Voter from './Voter';
import ArticleDelete from './ArticleDelete';
import ErrorDisplay from './ErrorDisplay';
import { Link } from '@reach/router';

class ArticlePage extends Component {
  state = {
    article: {},
    isLoading: true,
    err: null
  };

  componentDidMount() {
    getArticle(this.props.article)
      .then(({ article }) => {
        this.setState({ article, isLoading: false });
      })
      .catch(({ response }) => {
        this.setState({ err: response, isLoading: false });
      });
  }

  render() {
    const { article, isLoading, err } = this.state;
    const { activeUser } = this.props;
    return isLoading ? (
      <p>Loading</p>
    ) : err ? (
      <ErrorDisplay err={err} />
    ) : (
      <section id="article-page">
        <h2>{article.title}</h2>
        <main id="article-body">{article.body}</main>
        <section id="article-page-header">
          <Link
            to={`/users/${article.author}`}
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <h3>{article.author}</h3>
          </Link>
          <p>{formatDates(article.created_at)}</p>
          <Voter subject={article} activeUser={activeUser} />
          <ArticleDelete activeUser={activeUser} article={article} />
        </section>{' '}
        <CommentList article={article} activeUser={activeUser} />
      </section>
    );
  }
}

export default ArticlePage;
