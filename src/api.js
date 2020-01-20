import axios from 'axios';

const baseURL = 'https://cals-nc-news-app.herokuapp.com/api/';

export const getList = async (
  data,
  commentStr,
  page,
  topic,
  author,
  sort_by,
  order
) => {
  const url = commentStr ? baseURL + data + commentStr : baseURL + data;
  const list = await axios.get(url, {
    params: { page, topic, author, sort_by, order }
  });
  return list.data;
};

export const getItem = async (category, identifier) => {
  const item = await axios.get(baseURL + category + identifier);
  return item.data;
};

export const postItem = async (category, item, id, commentStr) => {
  const url = id ? baseURL + category + id + commentStr : baseURL + category;
  const newItem = await axios.post(url, item);
  return newItem.data;
};

export const deleteItem = async (category, id) => {
  const deleteRes = await axios.delete(baseURL + category + id);
  return deleteRes.status;
};

export const patchVotes = async (data, id, upOrDown) => {
  const updatedVotes = await axios.patch(baseURL + data + id, {
    inc_votes: upOrDown
  });
  return updatedVotes.data;
};
