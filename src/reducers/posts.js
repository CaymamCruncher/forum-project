import {RECEIVE_POSTS, REMOVE_POST, SUBTRACT_COMMENT, NEW_COMMENT, CHANGE_SCORE, ADD_POST, EDIT_POST} from '../actions/posts'

export default function posts(state = [], action) {
  switch (action.type) {
    case RECEIVE_POSTS:
      return action.posts

    case REMOVE_POST:
      return state.filter((post) => post.id !== action.id)

    case SUBTRACT_COMMENT:
      let newState = state.map((post) => {
        if (post.id === action.postId) {
          post.commentCount -= 1
          return post
        } else {
          return post
        }
      })
      return [...newState]

    case NEW_COMMENT:
      let newerState = state.map((post => {
        if (post.id === action.postId) {
          post.commentCount += 1
          return post
        } else {
          return post
        }
      }))
      return [...newerState]

    case CHANGE_SCORE:
      let newestState = state.map((post => {
        if (post.id === action.post.id) {
          post.voteScore += action.number
          return post
        } else {
          return post
        }
      }))
      return [...newestState]

    case ADD_POST:
      let postState = state
      postState.push(action.post)
      return [...postState]

    case EDIT_POST:
      let editedPostState = state.map((post) => {
        if (post.id === action.post.id) {
          post = action.post
          return post
        } else {
          return post
        }
      })
      return [...editedPostState]

    default:
      return state
  }
}
