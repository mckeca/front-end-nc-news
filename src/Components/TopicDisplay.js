import React, { Component } from 'react';
import * as api from '../api';

class TopicDisplay extends Component {
  state = {
    topic: {},
    isLoading: true
  };

  componentDidMount() {
    this.fetchTopic();
  }

  componentDidUpdate(prevProps) {
    const { topicSlug } = this.props;
    const topicChange = topicSlug !== prevProps.topicSlug;
    if (topicChange) this.fetchTopic();
  }

  render() {
    const { topic, isLoading } = this.state;
    return isLoading ? (
      <h3>Fetching Topic</h3>
    ) : (
      <div id="topic-display">
        <h3>{topic.slug.slice(0, 1).toUpperCase() + topic.slug.slice(1)}</h3>
        <p>{topic.description}</p>
      </div>
    );
  }

  fetchTopic = () => {
    const { topicSlug } = this.props;
    api.getItem('topics/', topicSlug).then(({ topic }) => {
      this.setState({ topic, isLoading: false });
    });
  };
}

export default TopicDisplay;
