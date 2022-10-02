import request from '@/utils/request.js';

export const getArticleListAPI = async function (page, limit) {
  return request.get('/articles', {
    params: {
      _page: page,
      _limit: limit,
    },
  });
};
