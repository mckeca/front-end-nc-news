import React, { Component } from 'react';
import { getData } from '../api';
import ArticleCard from './ArticleCard';
import SortForm from './SortForm';

class ArticleList extends Component {
  state = { articles: [], isLoading: true };

  componentDidMount() {
    getData('articles', this.props.topic, undefined, 'created_at').then(
      ({ articles }) => {
        this.setState({ articles, isLoading: false });
      }
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.topic !== this.props.topic ||
      this.state.sort_by !== prevState.sort_by ||
      this.state.order !== prevState.order
    )
      getData(
        'articles',
        this.props.topic,
        undefined,
        this.state.sort_by,
        this.state.order
      ).then(({ articles }) => {
        this.setState({ articles, isLoading: false });
      });
  }

  render() {
    const { articles, isLoading } = this.state;
    const { topic } = this.props;
    return (
      <main>
        {topic && <h3>{topic.slice(0, 1).toUpperCase() + topic.slice(1)}</h3>}
        <SortForm sortList={this.sortList} />
        {isLoading ? (
          <p>Loading</p>
        ) : (
          <ul id="article-list">
            {articles.map(article => {
              return <ArticleCard key={article.article_id} article={article} />;
            })}
          </ul>
        )}
      </main>
    );
  }

  sortList = (sort_by, order) => {
    this.setState({ sort_by, order });
  };
}

export default ArticleList;
