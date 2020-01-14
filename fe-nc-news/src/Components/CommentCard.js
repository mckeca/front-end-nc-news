import React from 'react';
import { formatDates } from '../utils';

const CommentCard = ({ comment }) => {
  return (
    <li>
      <p>{comment.body}</p>
      <p>{comment.votes}</p>
      <p>{comment.author}</p>
      <p>{formatDates(comment.created_at)}</p>
    </li>
  );
};

export default CommentCard;
