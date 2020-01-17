import React, { Component } from 'react';

class CommentAdder extends Component {
  state = {
    comment: '',
    emptyComment: false
  };

  render() {
    const { comment, emptyComment } = this.state;
    const { activeUser } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Write a comment:
          <input
            type="textarea"
            name="comment"
            value={comment}
            onChange={this.handleChange}
            autoComplete="off"
          />
        </label>
        <button type="submit">Submit</button>
        {emptyComment && <p>Please provide comment text</p>}
        {activeUser.length === 0 && <p>You must log in to post a comment</p>}
      </form>
    );
  }

  handleChange = event => {
    this.setState({ comment: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { comment } = this.state;
    const { article, activeUser, addComment } = this.props;
    const newComment = { body: comment, username: activeUser };
    if (activeUser.length > 0) {
      if (comment) {
        addComment(article.article_id, newComment);
        this.setState({ comment: '', emptyComment: false });
      } else {
        this.setState({ emptyComment: true });
      }
    }
  };
}

export default CommentAdder;
