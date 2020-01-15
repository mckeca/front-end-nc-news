import React, { Component } from 'react';

class NewTopic extends Component {
  state = {
    topicName: '',
    topicDesc: ''
  };
  render() {
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
            value={this.state.topicName}
          ></input>
        </label>
        <label>
          {' '}
          New topic description:
          <input
            type="text"
            name="topicDesc"
            onChange={this.handleTextChange}
            value={this.state.topicDesc}
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
    const topic = {
      description: topicDesc,
      slug: topicName
    };
    this.props.addTopic(topic);
    this.setState({ topicName: '', topicDesc: '' });
  };
}

export default NewTopic;
