import axios from 'axios';

export const getData = (data, topic, author, sort_by, order) => {
  return axios
    .get(`https:cals-nc-news-app.herokuapp.com/api/${data}`, {
      params: {
        topic,
        author,
        sort_by,
        order
      }
    })
    .then(res => {
      return res.data;
    });
};

export const getUser = user => {
  return axios
    .get(`https:cals-nc-news-app.herokuapp.com/api/users/${user}`)
    .then(res => {
      return res.data;
    });
};

export const getArticle = article => {
  return axios
    .get(`https:cals-nc-news-app.herokuapp.com/api/articles/${article}`)
    .then(res => {
      return res.data;
    });
};

export const getCommentsByArticle = article => {
  return axios
    .get(
      `https:cals-nc-news-app.herokuapp.com/api/articles/${article}/comments`
    )
    .then(res => {
      return res.data;
    });
};
