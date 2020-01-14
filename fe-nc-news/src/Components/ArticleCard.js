import React from 'react';
import { Link } from '@reach/router';
import { formatDates } from '../utils';

const ArticleCard = ({ article }) => {
  return (
    <li>
      <section className="article-card">
        <img
          src="https://img1.looper.com/img/gallery/the-untold-truth-of-anchorman/intro-1498834892.jpg"
          alt="Placeholder"
        />
        <h2 className="article-title">{article.title}</h2>
        <p className="article-topic">{article.topic}</p>
        <p className="article-author">{article.author}</p>
        <p className="article-votes">{article.votes}</p>
        <p className="article-comments">{article.comment_count}</p>
        <p className="article-date">{formatDates(article.created_at)}</p>
        <Link
          className="article-link"
          to={`/articles/${article.article_id}`}
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <p>></p>
        </Link>
      </section>
    </li>
  );
};

export default ArticleCard;
