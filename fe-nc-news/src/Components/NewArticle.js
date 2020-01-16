import React, { Component } from 'react';
import { getData, postArticle } from '../api';
import { Redirect, navigate } from '@reach/router';
import ErrorDisplay from './ErrorDisplay';

class NewArticle extends Component {
  state = {
    article: {},
    articleTitle: '',
    articleText: '',
    articleTopic: 'coding',
    topics: [],
    redirect: false,
    isLoading: true,
    err: null
  };

  componentDidMount() {
    getData('topics')
      .then(({ topics }) => {
        this.setState({ topics, isLoading: false });
      })
      .catch(({ response }) => {
        this.setState({ err: response, isLoading: false });
      });
  }

  render() {
    const { article, topics, redirect, isLoading, err } = this.state;
    if (isLoading) return <p>Loading...</p>;
    if (err) return <ErrorDisplay err={err} />;
    return redirect ? (
      <Redirect to={`/articles/${article.article_id}`} />
    ) : (
      <main>
        <form id="new-article-form" onSubmit={this.handleArticleSubmit}>
          <label id="new-article-title">
            Title:
            <input
              type="text"
              name="articleTitle"
              onChange={this.handleTextChange}
              value={this.state.articleTitle}
            />
          </label>
          <label id="new-article-topic">
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
          <label id="new-article-text-label" htmlFor="new-article-textarea">
            Article Text:
          </label>
          <textarea
            id="new-article-textarea"
            placeholder="Your article here..."
            cols="30"
            rows="5"
            name="articleText"
            onChange={this.handleTextChange}
            value={this.state.articleText}
          />

          <button id="new-article-submit" type="submit">
            Submit Article
          </button>
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
      .catch(({ response }) => {
        this.setState({ err: response, isLoading: false });
      });
  };
}

export default NewArticle;
