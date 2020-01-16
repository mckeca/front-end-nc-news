import React from 'react';
import { Link } from '@reach/router';
import { formatDates } from '../utils';

const ArticleCard = ({ article }) => {
  const findImage = topic => {
    if (topic === 'coding')
      return 'http://cdn.differencebetween.net/wp-content/uploads/2018/01/Difference-between-Coding-and-Programming.jpg';
    if (topic === 'cooking')
      return 'https://www.ucsf.edu/sites/default/files/styles/article_feature_banner__image/public/2019-09/vegetables-cooking-food-banner-size.jpg';
    if (topic === 'football')
      return 'https://e3.365dm.com/19/08/768x432/skynews-premier-league-football_4740175.jpg?20190809072217';
    return 'https://groups.runtogether.co.uk/Library/MoorRunningFriends2?command=Proxy&lang=en&type=Files&currentFolder=%2F&hash=3c454b7e955e0774aae5ef06a8b5e8e914b55462&fileName=news.jpg';
  };

  return (
    <li>
      {' '}
      <section className="article-card">
        <img src={findImage(article.topic)} alt={article.topic} />
        <h2 className="article-title">{article.title}</h2>
        <p className="article-topic">{article.topic}</p>
        <Link
          to={`/users/${article.author}`}
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <p className="article-author">{article.author}</p>
        </Link>
        <p className="article-votes">
          <span role="img" aria-label="votes">
            👍
          </span>
          {article.votes}
        </p>
        <p className="article-comments">
          <span role="img" aria-label="comments">
            💬
          </span>
          {article.comment_count}
        </p>
        <p className="article-date">{formatDates(article.created_at)}</p>
        <Link
          to={`/articles/${article.article_id}`}
          style={{ textDecoration: 'none', color: 'white' }}
          className="article-link"
        >
          ><p></p>
        </Link>
      </section>
    </li>
  );
};

export default ArticleCard;
