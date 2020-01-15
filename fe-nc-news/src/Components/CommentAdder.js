import React, { Component } from 'react';

class CommentAdder extends Component {
  state = {
    comment: ''
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Write a comment:
          <input
            type="textarea"
            name="comment"
            value={this.state.comment}
            onChange={this.handleChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    );
  }

  handleChange = event => {
    this.setState({ comment: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { comment } = this.state;
    const newComment = { body: comment, username: this.props.activeUser };
    this.props.addComment(this.props.article.article_id, newComment);
    this.setState({ comment: '' });
  };
}

export default CommentAdder;
