import React, { Component } from 'react';
import { getData } from '../api';
import ArticleCard from './ArticleCard';
import SortForm from './SortForm';
import ErrorDisplay from './ErrorDisplay';

class ArticleList extends Component {
  state = {
    articles: [],
    isLoading: true,
    sort_by: null,
    order: null,
    page: 1,
    totalCount: 0,
    err: null
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    const topicChange = prevProps.topic !== this.props.topic;
    const sortByChange = this.state.sort_by !== prevState.sort_by;
    const orderChange = this.state.order !== prevState.order;
    const pageChange = this.state.page !== prevState.page;
    if (topicChange || sortByChange || orderChange || pageChange)
      this.fetchData();
  }

  render() {
    const { articles, isLoading, page, totalCount, err } = this.state;
    const { topic } = this.props;
    if (err) return <ErrorDisplay err={err} />;
    return (
      <main>
        {topic && <h3>{topic.slice(0, 1).toUpperCase() + topic.slice(1)}</h3>}
        <SortForm sortList={this.sortList} />
        <section id="page-btns">
          <button
            onClick={() => {
              this.handleClick(-1);
            }}
            disabled={page === 1}
          >
            Prev
          </button>
          <button
            onClick={() => {
              this.handleClick(1);
            }}
            disabled={page === Math.ceil(totalCount / 10)}
          >
            Next
          </button>
        </section>
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

  fetchData = () => {
    const { topic } = this.props;
    const { sort_by, order, page } = this.state;
    getData('articles', topic, undefined, sort_by, order, page)
      .then(({ articles, total_count }) => {
        this.setState({ articles, totalCount: total_count, isLoading: false });
      })
      .catch(({ response }) => {
        this.setState({ err: response, isLoading: false });
      });
  };

  sortList = (sort_by, order) => {
    this.setState({ sort_by, order });
  };

  handleClick = direction => {
    this.setState(currentState => {
      return {
        page: currentState.page + direction
      };
    });
  };
}

export default ArticleList;
