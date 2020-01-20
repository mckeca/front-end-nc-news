import React, { Component } from 'react';
import * as api from '../api';
import ErrorDisplay from './ErrorDisplay';

class Voter extends Component {
  state = {
    voteChange: 0,
    yourOwnPost: false,
    err: null
  };

  componentDidMount() {
    const { activeUser, subject } = this.props;
    if (activeUser === subject.author) {
      this.setState({ yourOwnPost: true });
    }
  }

  render() {
    const { subject } = this.props;
    const { voteChange, yourOwnPost, err } = this.state;
    if (err) return <ErrorDisplay err={err} />;
    return (
      <section id="vote-comment-btn">
        <p>
          <span role="img" aria-label="votes">
            👍
          </span>
          {subject.votes + voteChange}
        </p>
        <button
          onClick={this.handleClick}
          name="plus"
          disabled={voteChange > 0 || yourOwnPost}
        >
          +
        </button>
        <button
          onClick={this.handleClick}
          name="minus"
          disabled={voteChange < 0 || yourOwnPost}
        >
          -
        </button>
      </section>
    );
  }

  handleClick = event => {
    const { subject } = this.props;
    const data = subject.article_id ? 'articles/' : 'comments/';
    const id = subject.article_id ? subject.article_id : subject.comment_id;
    const upOrDown = event.target.name === 'plus' ? 1 : -1;
    this.setState(currentState => {
      return {
        voteChange: currentState.voteChange + upOrDown,
        voted: true
      };
    });
    api.patchVotes(data, id, upOrDown).catch(({ response }) => {
      this.setState({ err: response });
    });
  };
}

export default Voter;
