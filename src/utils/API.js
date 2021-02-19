const token = 'database'
const url = 'http://localhost:3000/'
const headers = {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': token }

export function getAllPosts() {
  return (
    fetch(`${url}/posts`, { headers })
      .then(res => res.json())
      .catch(error => console.warn(error))
  )
}

export function getAllCategories() {
  return (
    fetch(`${url}/categories`, { headers })
      .then(res => res.json())
      .catch(error => console.warn(error))
  )
}

export function getAllComments(posts) {
  let commentsObject = {}
  posts.map((post) => {
    getComments(post.id).then(comments => (
      commentsObject[post.id] = comments
    ))
    return commentsObject
  })
  return Promise.all([commentsObject])
}

export function getComments(id) {
  return (
    fetch(`${url}/posts/${id}/comments`, {headers})
      .then(res => res.json())
      .catch(error => console.warn(error))
  )
}

export function removePost(post) {
  return (
    fetch(`${url}/posts/${post.id}`, {method: 'DELETE', headers: headers})
      .then(res => post)
      .catch(error => console.warn(error))
  )
}

export function removeComment(comment) {
  return (
    fetch(`${url}/comments/${comment.id}`, {method: 'DELETE', headers: headers})
      .then(res => comment)
      .catch(error => console.warn(error))
  )
}

export function addComment(comment) {
  return (
    fetch(`${url}/comments`, {method: 'POST', body: JSON.stringify(comment), headers: headers})
      .then(res => comment)
      .catch(error => console.warn(error))
  )
}

export function addPost(post) {
  return (
    fetch(`${url}/posts`, {method: 'POST', body: JSON.stringify(post), headers: headers})
      .then(res => post)
      .catch(error => console.warn(error))
  )
}

export function editPost(post) {
  return (
    fetch(`${url}/posts/${post.id}`, {method: 'PUT', body: JSON.stringify(post), headers: headers})
      .then(res => post)
      .catch(error => console.warn(error))
  )
}

export function editComment(comment) {
  return (
    fetch(`${url}/comments/${comment.id}`, {method: 'PUT', body: JSON.stringify(comment), headers: headers})
      .then(res => comment)
      .catch(error => console.warn(error))
  )
}

export function changePostScore(object) {
  return (
    fetch(`${url}/posts/${object.post.id}`, {method: 'POST', body: JSON.stringify(object), headers: headers})
      .then(res => object)
      .catch(error => console.warn(error))
  )
}

export function changeCommentScore(object) {
  return (
    fetch(`${url}/comments/${object.comment.id}`, {method: 'POST', body: JSON.stringify(object), headers: headers})
      .then(res => object)
      .catch(error => console.warn(error))
  )
}


//formats timestamp
export function formatTimestamp(timestamp) {
  return new Intl.DateTimeFormat('en-US', {year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(timestamp)
}
