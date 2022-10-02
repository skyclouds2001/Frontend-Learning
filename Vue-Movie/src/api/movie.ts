import request from '@/utils/request'

export const getInTheaters = ({ start = 0, count = 5 }) => {
  return request({
    url: `in_theaters?start=${start}&count=${count}`
  })
}

export const getComingSoon = ({ start = 0, count = 5 }) => {
  return request({
    url: `coming_soon?start=${start}&count=${count}`
  })
}

export const getTop250 = ({ start = 0, count = 5 }) => {
  return request({
    url: `top250?start=${start}&count=${count}`
  })
}

export const getMovieList = ({ type = '', start = 0, count = 5 }) => {
  return request({
    url: `${type}?start=${start}&count=${count}`
  })
}

export const getMovieInfo = (id: string) => {
  return request({
    url: `/subject/${id}`
  })
}
