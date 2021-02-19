import {receivePosts} from './posts'
import {receiveComments} from './comments'
import {receiveCategories} from './categories'
import {getAllPosts, getAllCategories, getAllComments} from '../utils/API'

export function handleInitialData() {
  return (dispatch) => {
    return Promise.all([
      getAllPosts(),
      getAllCategories()
    ]).then(([posts, categories]) => {
      getAllComments(posts).then((comments) => {
        dispatch(receiveComments(comments))
        dispatch(receivePosts(posts))
        dispatch(receiveCategories(categories))
      })
    })
  }
}
