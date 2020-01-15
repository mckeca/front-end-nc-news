import React, { Component } from 'react';
import { getCommentsByArticle, deleteComment, postComment } from '../api';
import CommentAdder from './CommentAdder';
import CommentCard from './CommentCard';

class CommentList extends Component {
  state = {
    comments: []
  };

  componentDidMount() {
    getCommentsByArticle(this.props.article.article_id)
      .then(({ comments }) => {
        this.setState({ comments });
      })
      .catch(err => console.dir(err));
  }

  render() {
    const { article } = this.props;
    return (
      <section>
        <p>comments: {article.comment_count}</p>
        <CommentAdder
          addComment={this.addComment}
          article={this.props.article}
          activeUser={this.props.activeUser}
        />
        <ul>
          {this.state.comments.map(comment => {
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
      .catch(err => console.dir(err));
  };

  removeComment = id => {
    deleteComment(id).then(() => {
      this.setState(currentState => {
        return {
          comments: currentState.comments.filter(comment => {
            return comment.comment_id !== id;
          })
        };
      });
    });
  };
}

export default CommentList;
