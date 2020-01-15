import React, { Component } from 'react';
import { getData, postArticle, postTopic } from '../api';
import { Redirect } from '@reach/router';

class NewArticle extends Component {
  state = {
    article: {},
    articleTitle: '',
    articleText: '',
    topicName: '',
    topicDesc: '',
    articleTopic: 'coding',
    topics: [],
    redirect: false
  };

  componentDidMount() {
    getData('topics').then(({ topics }) => {
      this.setState({ topics });
    });
  }

  render() {
    const { article, topics, redirect } = this.state;
    return redirect ? (
      <Redirect to={`/articles/${article.article_id}`} />
    ) : (
      <main>
        <form onSubmit={this.handleArticleSubmit}>
          <label>
            Title:
            <input
              type="text"
              name="articleTitle"
              onChange={this.handleTextChange}
              value={this.state.articleTitle}
            />
          </label>
          <label>
            {' '}
            Topic:
            <select onChange={this.handleSelectChange}>
              {topics.map(topic => {
                return (
                  <option key={topic.slug} value={topic.slug}>
                    {topic.slug.slice(0, 1).toUpperCase() + topic.slug.slice(1)}
                  </option>
                );
              })}
            </select>
          </label>
          <label>
            Article Text:
            <input
              type="textarea"
              name="articleText"
              onChange={this.handleTextChange}
              value={this.state.articleText}
            />
            <button type="submit">Submit Article</button>
          </label>
        </form>
        <p>Can't find what you're looking for? Create a new topic:</p>
        <form onSubmit={this.handleTopicSubmit}>
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
      </main>
    );
  }

  handleTextChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSelectChange = event => {
    this.setState({ articleTopic: event.target.value });
  };

  handleTopicSubmit = event => {
    event.preventDefault();
    const { topicDesc, topicName } = this.state;
    const topic = {
      description: topicDesc,
      slug: topicName
    };
    postTopic(topic)
      .then(({ topic }) => {
        this.setState(currentState => {
          return { topics: [topic, ...currentState.topics] };
        });
      })
      .catch(err => {
        console.dir(err);
      });
  };

  handleArticleSubmit = event => {
    event.preventDefault();
    const { articleText, articleTitle, articleTopic } = this.state;
    const article = {
      title: articleTitle,
      body: articleText,
      topic: articleTopic,
      author: this.props.activeUser
    };
    postArticle(article)
      .then(({ article }) => {
        this.setState({ article, redirect: true });
      })
      .catch(err => {
        console.dir(err);
      });
  };
}

export default NewArticle;
