import React, { Component } from 'react';

class CommentAdder extends Component {
  state = {
    comment: '',
    emptyComment: false
  };

  render() {
    const { comment, emptyComment } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Write a comment:
          <input
            type="textarea"
            name="comment"
            value={comment}
            onChange={this.handleChange}
          />
        </label>
        <button type="submit">Submit</button>
        {emptyComment && <p>Please provide comment text</p>}
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
    if (comment) {
      this.props.addComment(this.props.article.article_id, newComment);
      this.setState({ comment: '', emptyComment: false });
    } else {
      this.setState({ emptyComment: true });
    }
  };
}

export default CommentAdder;
