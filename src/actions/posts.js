import * as API from '../utils/API'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const REMOVE_POST = 'REMOVE_POST'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const SUBTRACT_COMMENT = 'SUBTRACT_COMMENT'
export const NEW_COMMENT = 'NEW_COMMENT'
export const CHANGE_SCORE = 'CHANGE_SCORE'


export function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    posts
  }
}

function removePost(id) {
  return {
    type: REMOVE_POST,
    id
  }
}

function addPost(post) {
  return {
    type: ADD_POST,
    post
  }
}

function editPost(post) {
  return {
    type: EDIT_POST,
    post
  }
}

export function handleEditPost(post) {
  return (dispatch) => {
    return API.editPost(post).then((post) => {
      dispatch(editPost(post))
    }).catch(error => console.warn(error))
  }
}

export function handleAddPost(post) {
  return (dispatch) => {
    return API.addPost(post).then((post) => {
      dispatch(addPost(post))
    }).catch(error => console.warn(error))
  }
}

export function handleRemovePost(post) {
  return (dispatch) => {
    return API.removePost(post).then((post) => {
      dispatch(removePost(post.id))
    }).catch(error => console.warn(error))
  }
}

//comment related actions
export function subtractComment(postId) {
  return {
    type: SUBTRACT_COMMENT,
    postId
  }
}

export function newComment(postId) {
  return {
    type: NEW_COMMENT,
    postId
  }
}

function changeScore(post, number) {
  return {
    type: CHANGE_SCORE,
    post,
    number
  }
}

export function handleChangeScore(object) {
  return (dispatch) => {
    return API.changePostScore(object).then((object) => {
      dispatch(changeScore(object.post, object.number))
    }).catch(error => console.warn(error))
  }
}
