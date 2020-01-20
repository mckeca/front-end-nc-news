import axios from 'axios';

const baseURL = 'https://cals-nc-news-app.herokuapp.com/api/';

export const getList = async (data, topic, author, sort_by, order, page) => {
  const list = await axios.get(baseURL + data, {
    params: {
      topic,
      author,
      sort_by,
      order,
      page
    }
  });
  return list.data;
};

export const getItem = async (category, identifier) => {
  const item = await axios.get(baseURL + category + identifier);
  return item.data;
};

export const postItem = async (category, item) => {
  const newItem = await axios.post(baseURL + category, item);
  return newItem.data;
};

export const patchVotes = async (data, id, upOrDown) => {
  const updatedVotes = await axios.patch(
    `https://cals-nc-news-app.herokuapp.com/api/${data}/${id}`,
    {
      inc_votes: upOrDown
    }
  );
  return updatedVotes.data;
};

export const deleteItem = async (category, id) => {
  const deleteRes = await axios.delete(baseURL + category + id);
  return deleteRes.status;
};

export const getCommentsByArticle = async (article, page) => {
  const commentList = await axios.get(
    `https://cals-nc-news-app.herokuapp.com/api/articles/${article}/comments`,
    {
      params: {
        page
      }
    }
  );
  return commentList.data;
};

export const postCommentToArticle = async (id, comment) => {
  const newComment = await axios.post(
    `https://cals-nc-news-app.herokuapp.com/api/articles/${id}/comments`,
    comment
  );
  return newComment.data;
};
