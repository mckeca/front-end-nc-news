import React, { Component } from 'react';

class NewTopic extends Component {
  state = {
    topicName: '',
    topicDesc: ''
  };
  render() {
    const { topicName, topicDesc } = this.state;
    return (
      <form onSubmit={this.handleTopicSubmit}>
        <p>Can't find what you're looking for? Create a new topic:</p>
        <label>
          {' '}
          New topic name:
          <input
            type="text"
            name="topicName"
            onChange={this.handleTextChange}
            value={topicName}
          ></input>
        </label>
        <label>
          {' '}
          New topic description:
          <input
            type="text"
            name="topicDesc"
            onChange={this.handleTextChange}
            value={topicDesc}
          ></input>
        </label>
        <button type="submit">Submit Topic</button>
      </form>
    );
  }

  handleTextChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleTopicSubmit = event => {
    event.preventDefault();
    const { topicDesc, topicName } = this.state;
    const { addTopic } = this.props;
    const topic = {
      description: topicDesc,
      slug: topicName
    };
    addTopic(topic);
    this.setState({ topicName: '', topicDesc: '' });
  };
}

export default NewTopic;
