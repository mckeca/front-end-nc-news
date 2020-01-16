import React, { Component } from 'react';
import { getCommentsByArticle, deleteComment, postComment } from '../api';
import CommentAdder from './CommentAdder';
import CommentCard from './CommentCard';
import ErrorDisplay from './ErrorDisplay';

class CommentList extends Component {
  state = {
    comments: [],
    err: null
  };

  componentDidMount() {
    getCommentsByArticle(this.props.article.article_id)
      .then(({ comments }) => {
        this.setState({ comments });
      })
      .catch(({ response }) => {
        this.setState({ err: response });
      });
  }

  render() {
    const { article } = this.props;
    const { comments, err } = this.state;
    if (err) return <ErrorDisplay err={err} />;
    return (
      <section>
        <p>comments: {article.comment_count}</p>
        <CommentAdder
          addComment={this.addComment}
          article={this.props.article}
          activeUser={this.props.activeUser}
        />
        <ul>
          {comments.map(comment => {
            return (
              <CommentCard
                key={comment.comment_id}
                comment={comment}
                activeUser={this.props.activeUser}
                removeComment={this.removeComment}
              />
            );
          })}
        </ul>
      </section>
    );
  }

  addComment = (id, newComment) => {
    postComment(id, newComment)
      .then(({ comment }) => {
        this.setState(currentState => {
          return { comments: [comment, ...currentState.comments] };
        });
      })
      .catch(({ response }) => {
        this.setState({ err: response });
      });
  };

  removeComment = id => {
    deleteComment(id)
      .then(() => {
        this.setState(currentState => {
          return {
            comments: currentState.comments.filter(comment => {
              return comment.comment_id !== id;
            })
          };
        });
      })
      .catch(({ response }) => {
        this.setState({ err: response });
      });
  };
}

export default CommentList;
