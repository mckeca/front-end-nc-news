import React from 'react';
import { formatDates } from '../utils';
import Voter from './Voter';

const CommentCard = ({ comment, activeUser, removeComment }) => {
  return (
    <li className="comment-card">
      <main>{comment.body}</main>
      {activeUser === comment.author && (
        <section id="delete-comment-btn">
          <button
            onClick={() => {
              removeComment(comment.comment_id);
            }}
          >
            X
          </button>
        </section>
      )}
      <Voter subject={comment} activeUser={activeUser} />
      <p id="comment-author">{comment.author}</p>
      <p id="comment-date">{formatDates(comment.created_at)}</p>
    </li>
  );
};

export default CommentCard;
