import React, { Component } from 'react';
import {deleteArticle} from '../api'

class ArticleDelete extends Component {
  state = {
    toggleSureCheck: false
  };
  render() {
    const { article } = this.props;
    const { toggleSureCheck } = this.state;
    return (
      <section>
        {this.props.activeUser === article.author && (
          <button onClick={this.toggleSure}>Delete</button>
        )}
        {toggleSureCheck && <button onClick={this.removeArticle}>Yes!</button>}
        {toggleSureCheck && <button onClick={this.toggleSure}>Nope</button>}
      </section>
    );
  }

  toggleSure = () => {
      this.setState((currentState) => {
          return {toggleSureCheck: !currentState.toggleSureCheck}
      })
  }

  removeArticle = () > {

  }
}

export default ArticleDelete;
