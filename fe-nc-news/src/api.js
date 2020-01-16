import axios from 'axios';

export const getData = (data, topic, author, sort_by, order, page) => {
  return axios
    .get(`https:cals-nc-news-app.herokuapp.com/api/${data}`, {
      params: {
        topic,
        author,
        sort_by,
        order,
        page
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

export const getCommentsByArticle = (article, page) => {
  return axios
    .get(
      `https:cals-nc-news-app.herokuapp.com/api/articles/${article}/comments`,
      {
        params: {
          page
        }
      }
    )
    .then(res => {
      return res.data;
    });
};

export const patchVotes = (data, id, upOrDown) => {
  return axios
    .patch(`https:cals-nc-news-app.herokuapp.com/api/${data}/${id}`, {
      inc_votes: upOrDown
    })
    .then(res => {
      return res.data;
    });
};

export const postComment = (id, comment) => {
  return axios
    .post(
      `https:cals-nc-news-app.herokuapp.com/api/articles/${id}/comments`,
      comment
    )
    .then(res => {
      return res.data;
    });
};

export const deleteComment = id => {
  return axios
    .delete(`https:cals-nc-news-app.herokuapp.com/api/comments/${id}/`)
    .then(res => {
      return res.status;
    });
};

export const postArticle = article => {
  return axios
    .post('https:cals-nc-news-app.herokuapp.com/api/articles', article)
    .then(res => {
      return res.data;
    });
};

export const postTopic = topic => {
  return axios
    .post('https:cals-nc-news-app.herokuapp.com/api/topics', topic)
    .then(res => {
      return res.data;
    });
};

export const deleteArticle = id => {
  return axios
    .delete(`https:cals-nc-news-app.herokuapp.com/api/articles/${id}/`)
    .then(res => {
      return res.status;
    });
};
