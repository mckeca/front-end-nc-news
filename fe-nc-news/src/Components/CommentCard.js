import React from 'react';
import { formatDates } from '../utils';
import Voter from './Voter';

const CommentCard = ({ comment, activeUser, removeComment }) => {
  return (
    <li>
      <p>{comment.body}</p>
      <button
        onClick={() => {
          if (activeUser === comment.author) {
            removeComment(comment.comment_id);
          }
        }}
      >
        X
      </button>
      <Voter subject={comment} activeUser={activeUser} />
      <p>{comment.author}</p>
      <p>{formatDates(comment.created_at)}</p>
    </li>
  );
};

export default CommentCard;
