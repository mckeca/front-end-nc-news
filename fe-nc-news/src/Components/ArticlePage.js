import React, { Component } from 'react';
import { getArticle, postComment } from '../api';
import { formatDates } from '../utils';
import CommentList from './CommentList';
import Voter from './Voter';
import ArticleDelete from './ArticleDelete';

class ArticlePage extends Component {
  state = {
    article: {},
    isLoading: true
  };

  componentDidMount() {
    getArticle(this.props.article).then(({ article }) => {
      this.setState({ article, isLoading: false });
    });
  }

  render() {
    const { article, isLoading } = this.state;
    const { activeUser } = this.props;
    return isLoading ? (
      <p>Loading</p>
    ) : (
      <section>
        <h2>{article.title}</h2>
        <ArticleDelete activeUser={activeUser} article={article} />
        <h3>{article.author}</h3>
        <p>{formatDates(article.created_at)}</p>
        <Voter subject={article} activeUser={activeUser} />
        <main>{article.body}</main>
        <CommentList article={article} activeUser={activeUser} />
      </section>
    );
  }

  addComment = (body, username) => {
    if (this.props.activeUser)
      postComment(this.state.article.article_id, body, username).then(
        ({ comment }) => {
          this.setState(currentState => {
            return { comments: [comment, ...currentState.comments] };
          });
        }
      );
  };
}

export default ArticlePage;
