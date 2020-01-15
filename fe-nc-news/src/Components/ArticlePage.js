import React, { Component } from 'react';
import { getArticle, postComment } from '../api';
import { formatDates } from '../utils';
import CommentList from './CommentList';
import Voter from './Voter';

class ArticlePage extends Component {
  state = {
    article: {},
    toggleSureCheck: false,
    isLoading: true
  };

  componentDidMount() {
    getArticle(this.props.article).then(({ article }) => {
      this.setState({ article, isLoading: false });
    });
  }

  render() {
    const { article, isLoading, toggleSureCheck } = this.state;
    return isLoading ? (
      <p>Loading</p>
    ) : (
      <section>
        <h2>{article.title}</h2>
        {this.props.activeUser === article.author && (
          <button onClick={this.toggleSure}>Delete</button>
        )}
        {toggleSureCheck && <button onClick={this.deleteComment}>Yes!</button>}
        {toggleSureCheck && <button onClick={this.toggleSure}>Nope</button>}
        <h3>{article.author}</h3>
        <p>{formatDates(article.created_at)}</p>
        <Voter subject={article} activeUser={this.props.activeUser} />
        <main>{article.body}</main>
        <CommentList
          article={this.props.article}
          activeUser={this.props.activeUser}
        />
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
