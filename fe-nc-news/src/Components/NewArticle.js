import React, { Component } from 'react';
import { getData, postArticle, postTopic } from '../api';
import { Redirect, navigate } from '@reach/router';
// import NewTopic from './NewTopic';

class NewArticle extends Component {
  state = {
    article: {},
    articleTitle: '',
    articleText: '',
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
        {/* <NewTopic addTopic={this.addTopic} /> */}
      </main>
    );
  }

  handleTextChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSelectChange = event => {
    this.setState({ articleTopic: event.target.value });
  };

  // addTopic = topic => {
  //   postTopic(topic)
  //     .then(({ topic }) => {
  //       this.setState(currentState => {
  //         return {
  //           topics: [topic, ...currentState.topics],
  //           articleTopic: topic
  //         };
  //       });
  //     })
  //     .catch(err => {
  //       console.dir(err);
  //     });
  // };

  handleArticleSubmit = async event => {
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
        this.setState({ article });
        navigate(`/articles/${article.article_id}`);
      })
      .catch(err => {
        console.dir(err);
      });
  };
}

export default NewArticle;
