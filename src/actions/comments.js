import * as API from '../utils/API'

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const CHANGE_VOTE = 'CHANGE_VOTE'
export const NEW_POST = 'NEW_POST'


export function receiveComments(comments) {
  return {
    type: RECEIVE_COMMENTS,
    comments
  }
}

function removeComment(comment) {
  return {
    type: REMOVE_COMMENT,
    comment
  }
}

function changeVote(comment, number) {
  return {
    type: CHANGE_VOTE,
    comment,
    number
  }
}

export function newPost(post) {
  return {
    type: NEW_POST,
    post
  }
}

function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment
  }
}

function editComment(comment) {
  return {
    type: EDIT_COMMENT,
    comment
  }
}

export function handleEditComment(comment) {
  return (dispatch) => {
    return API.editComment(comment).then((comment) => {
      dispatch(editComment(comment))
    }).catch(error => console.warn(error))
  }
}

export function handleChangeVote(object) {
  return (dispatch) => {
    return API.changeCommentScore(object).then((object) => {
      dispatch(changeVote(object.comment, object.number))
    }).catch(error => console.warn(error))
  }
}

export function handleAddComment(comment) {
  return (dispatch) => {
    return API.addComment(comment).then((comment) => {
      dispatch(addComment(comment))
    }).catch(error => console.warn(error))
  }
}

export function handleRemoveComment(comment) {
  return (dispatch) => {
    return API.removeComment(comment).then((comment) => {
      dispatch(removeComment(comment))
    }).catch(error => console.warn(error))
  }
}
