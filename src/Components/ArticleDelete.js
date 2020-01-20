import React, { Component } from 'react';
import * as api from '../api';
import { navigate } from '@reach/router';

class ArticleDelete extends Component {
  state = {
    toggleSureCheck: false,
    err: null
  };
  render() {
    const { article, activeUser } = this.props;
    const { toggleSureCheck } = this.state;
    return (
      <section>
        {activeUser === article.author && (
          <button onClick={this.toggleSure}>Delete</button>
        )}
        {toggleSureCheck && <button onClick={this.removeArticle}>Yes!</button>}
        {toggleSureCheck && <button onClick={this.toggleSure}>Nope</button>}
      </section>
    );
  }

  toggleSure = () => {
    this.setState(currentState => {
      return { toggleSureCheck: !currentState.toggleSureCheck };
    });
  };

  removeArticle = () => {
    const { article, activeUser } = this.props;
    api
      .deleteItem('articles/', article.article_id)
      .then(() => {
        navigate(`/users/${activeUser}`);
      })
      .catch(({ response }) => {
        this.setState({ err: response });
      });
  };
}

export default ArticleDelete;
