import React, { Component } from 'react';
import { patchVotes } from '../api';

class Voter extends Component {
  state = {
    voteChange: 0,
    voted: false
  };

  componentDidMount() {
    const { activeUser, subject } = this.props;
    if (activeUser === subject.author) {
      this.setState({ voted: true });
    }
  }

  render() {
    const { subject } = this.props;
    const { voteChange, voted } = this.state;
    return (
      <section id="vote-comment-btn">
        <p>
          <span role="img" aria-label="votes">
            👍
          </span>
          {subject.votes + voteChange}
        </p>
        <button onClick={this.handleClick} name="plus" disabled={voted}>
          +
        </button>
        <button onClick={this.handleClick} name="minus" disabled={voted}>
          -
        </button>
      </section>
    );
  }

  handleClick = event => {
    const { subject } = this.props;
    const data = subject.article_id ? 'articles' : 'comments';
    const id = subject.article_id ? subject.article_id : subject.comment_id;
    const upOrDown = event.target.name === 'plus' ? 1 : -1;
    patchVotes(data, id, upOrDown).then(() => {
      this.setState(currentState => {
        return {
          voteChange: currentState.voteChange + upOrDown,
          voted: true
        };
      });
    });
  };
}

export default Voter;
