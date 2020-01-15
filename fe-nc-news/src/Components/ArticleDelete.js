import React, { Component } from 'react';
import { deleteArticle } from '../api';
import { navigate } from '@reach/router';

class ArticleDelete extends Component {
  state = {
    toggleSureCheck: false
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
    deleteArticle(article.article_id).then(() => {
      navigate(`/users/${activeUser}`);
    });
  };
}

export default ArticleDelete;
