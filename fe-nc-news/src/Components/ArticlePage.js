import React, { Component } from 'react';
import CommentCard from './CommentCard';
import { getArticle, getCommentsByArticle } from '../api';

class ArticlePage extends Component {
  state = {
    article: {},
    comments: [],
    isLoading: true
  };

  componentDidMount() {
    Promise.all([
      getArticle(this.props.article),
      getCommentsByArticle(this.props.article)
    ]).then(([{ article }, { comments }]) => {
      this.setState({ article, comments, isLoading: false });
    });
  }

  render() {
    const { article, comments, isLoading } = this.state;
    return isLoading ? (
      <p>Loading</p>
    ) : (
      <section>
        <h2>{article.title}</h2>
        <h3>{article.author}</h3>
        <p>{article.created_at}</p>
        <p>votes: {article.votes}</p>
        <p>comments: {article.comment_count}</p>
        <main>{article.body}</main>
        <ul>
          {comments.map(comment => {
            return <CommentCard key={comment.comment_id} comment={comment} />;
          })}
        </ul>
      </section>
    );
  }
}

export default ArticlePage;
