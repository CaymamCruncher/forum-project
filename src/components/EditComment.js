import React, { Component } from 'react';
import {connect} from 'react-redux'
import {handleEditComment} from '../actions/comments'
import '../App.css';

class EditComment extends Component {
  state = {
    input: '',
    comment: ''
  }

  updateInput = (e) => {
    let input = e.target.value
    this.setState(() => ({
      input
    }))
  }

  addComment = (e) => {
    let {input, comment} = this.state
    let {posts} = this.props
    let selectedPost = posts.filter((post) => post.id === comment.parentId)[0]
    let newComment = {
      id: comment.id,
      parentId: comment.parentId,
      timestamp: comment.timestamp,
      author: comment.author,
      body: input,
      deleted: false,
      parentDeleted: false,
      voteScore: comment.voteScore
    }
    if (input) {
      this.setState(() => ({
        input: ''
      }))
      e.preventDefault()
      this.props.dispatch(handleEditComment(newComment)).then(() => {
        this.props.history.push(`/${selectedPost.category}/${selectedPost.id}`)
      })
    } else {
      alert('Please fill out all fields')
      e.preventDefault()
    }
  }

  componentDidMount() {
    let {parentId, commentId} = this.props.match.params
    let {comments} = this.props
    if (comments.length > 0) {
      let commentsArray = comments[0][parentId]
      let comment = []
      Object.keys(commentsArray).map((key) => {
        if (commentsArray[key].id === commentId) {
          return comment.push(commentsArray[key])
        } else {
          return null
        }
      })
    this.setState(() => ({
      input: comment[0].body,
      comment: comment[0]
    }))
    } else {
      this.props.history.push('/')
    }
  }

  render() {
    return (
      <section>
        <h2>Edit Comment</h2>
        <form>
          <textarea onChange={this.updateInput} value={this.state.input} placeholder='body here'/>
          <button onClick={this.addComment}>Submit</button>
        </form>
      </section>
    )
  }
}

const mapStateToProps = ({comments, posts}) => {
  return {
    comments,
    posts
  }
}

export default connect(mapStateToProps)(EditComment);
