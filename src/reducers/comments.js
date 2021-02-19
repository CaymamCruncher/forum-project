import {RECEIVE_COMMENTS, REMOVE_COMMENT, ADD_COMMENT, CHANGE_VOTE, NEW_POST, EDIT_COMMENT} from '../actions/comments'

export default function comments(state = [], action) {
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return action.comments

    case REMOVE_COMMENT:
      let comments = state[0][action.comment.parentId]
      let newState = []
      Object.keys(comments).map((key) => {
        if (comments[key].id === action.comment.id) {
          return delete comments[key]
        } else {
          return newState.push(comments[key])
        }
      })
      state[0][action.comment.parentId] = newState
      return [...state]

    case ADD_COMMENT:
      let newerState = state
      newerState[0][action.comment.parentId].push(action.comment)
      return newerState

    case CHANGE_VOTE:
      let newComments = state[0][action.comment.parentId]
      Object.keys(newComments).map((key) => {
        if (newComments[key].id === action.comment.id) {
          newComments[key].voteScore += action.number
          return newComments[key]
        } else {
          return newComments[key]
        }
      })
      state[0][action.comment.parentId] = newComments
      return [...state]

    case NEW_POST:
      let postState = state
      postState[0][action.post.id] = []
      return [...postState]

    case EDIT_COMMENT:
      let commentsArray = state[0][action.comment.parentId]
      let newCommentState = Object.keys(commentsArray).map((key) => {
        if (commentsArray[key].id === action.comment.id) {
          commentsArray[key] = action.comment
          return commentsArray[key]
        } else {
          return commentsArray[key]
        }
      })
      state[0][action.comment.parentId] = newCommentState
      return [...state]
      
    default:
      return state
  }
}
