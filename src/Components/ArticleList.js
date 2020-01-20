import React, { Component } from 'react';
import * as api from '../api';
import ArticleCard from './ArticleCard';
import SortForm from './SortForm';
import ErrorDisplay from './ErrorDisplay';
import Paginator from './Paginator';
import TopicDisplay from './TopicDisplay';

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
    const { topic } = this.props;
    const { sort_by, order, page } = this.state;
    const topicChange = prevProps.topic !== topic;
    const sortByChange = sort_by !== prevState.sort_by;
    const orderChange = order !== prevState.order;
    const pageChange = page !== prevState.page;
    if (topicChange || sortByChange || orderChange || pageChange)
      this.fetchData();
    if (topicChange) this.setState({ page: 1 });
  }

  render() {
    const { articles, isLoading, page, totalCount, err } = this.state;
    const { topic } = this.props;
    if (err) return <ErrorDisplay err={err} />;
    return (
      <main>
        {topic && <TopicDisplay topicSlug={topic} />}
        <SortForm sortList={this.sortList} />
        <Paginator
          page={page}
          count={totalCount}
          handleClick={this.handleClick}
        />
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
    api
      .getList('articles', undefined, page, topic, undefined, sort_by, order)
      .then(({ articles, total_count }) => {
        this.setState({
          articles,
          totalCount: total_count,
          isLoading: false,
          err: false
        });
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
