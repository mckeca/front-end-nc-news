import React, { Component } from 'react';
import { getArticle, postComment } from '../api';
import { formatDates } from '../utils';
import CommentList from './CommentList';
import Voter from './Voter';
import ArticleDelete from './ArticleDelete';
import ErrorDisplay from './ErrorDisplay';

class ArticlePage extends Component {
  state = {
    article: {},
    isLoading: true,
    error: false
  };

  componentDidMount() {
    getArticle(this.props.article)
      .then(({ article }) => {
        this.setState({ article, isLoading: false });
      })
      .catch(({ response }) => {
        const error = { status: response.status, msg: response.data.msg };
        this.setState({ error: error, isLoading: false });
      });
  }

  render() {
    const { article, isLoading, error } = this.state;
    const { activeUser } = this.props;
    return isLoading ? (
      <p>Loading</p>
    ) : error ? (
      <ErrorDisplay error={error} />
    ) : (
      <section id="article-page">
        <h2>{article.title}</h2>
        <main id="article-body">{article.body}</main>
        <section id="article-page-header">
          <h3>{article.author}</h3>
          <p>{formatDates(article.created_at)}</p>
          <Voter subject={article} activeUser={activeUser} />
          <ArticleDelete activeUser={activeUser} article={article} />
        </section>{' '}
        <CommentList article={article} activeUser={activeUser} />
      </section>
    );
  }

  addComment = (body, username) => {
    if (this.props.activeUser)
      postComment(this.state.article.article_id, body, username)
        .then(({ comment }) => {
          this.setState(currentState => {
            return { comments: [comment, ...currentState.comments] };
          });
        })
        .catch(({ response }) => {
          const error = { status: response.status, msg: response.data.msg };
          this.setState({ error, isLoading: false });
        });
  };
}

export default ArticlePage;
