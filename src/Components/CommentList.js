import React, { Component } from 'react';
import { getCommentsByArticle, deleteComment, postComment } from '../api';
import CommentAdder from './CommentAdder';
import CommentCard from './CommentCard';
import ErrorDisplay from './ErrorDisplay';
import Paginator from './Paginator';

class CommentList extends Component {
  state = {
    comments: [],
    page: 1,
    err: null
  };

  componentDidMount() {
    this.fetchComments();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) this.fetchComments();
  }

  render() {
    const { article, activeUser } = this.props;
    const { comments, page, err } = this.state;
    if (err) return <ErrorDisplay err={err} />;
    return (
      <section id="comment-list">
        <p>comments: {article.comment_count}</p>
        <Paginator
          page={page}
          count={article.comment_count}
          handleClick={this.handleClick}
        />
        <CommentAdder
          addComment={this.addComment}
          article={article}
          activeUser={activeUser}
        />
        <ul id="comment-list">
          {comments.map(comment => {
            return (
              <CommentCard
                key={comment.comment_id}
                comment={comment}
                activeUser={activeUser}
                removeComment={this.removeComment}
              />
            );
          })}
        </ul>
      </section>
    );
  }

  fetchComments = () => {
    const { article } = this.props;
    const { page } = this.state;
    getCommentsByArticle(article.article_id, page)
      .then(({ comments }) => {
        this.setState({ comments });
      })
      .catch(({ response }) => {
        this.setState({ err: response });
      });
  };

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

  handleClick = direction => {
    this.setState(currentState => {
      return {
        page: currentState.page + direction
      };
    });
  };
}

export default CommentList;
