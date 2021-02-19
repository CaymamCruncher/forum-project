import React, { Component } from 'react';
import {connect} from 'react-redux'
import {handleAddComment} from '../actions/comments'
import {newComment} from '../actions/posts'
import '../App.css';

class AddComment extends Component {
  state = {
    input: ''
  }
  updateInput = (e) => {
    let input = e.target.value
    this.setState(() => ({
      input
    }))
  }

  addComment = (e) => {
    let {input} = this.state
    let {parentId} = this.props.match.params
    let {posts} = this.props
    let selectedPost = posts.filter((post) => post.id === parentId)[0]
    let timestamp = Date.now()
    let id = timestamp + input.split(' ').join('')
    let author = 'Test User'
    let comment = {
      id: id,
      parentId: parentId,
      timestamp: timestamp,
      author: author,
      body: input,
      deleted: false,
      parentDeleted: false,
      voteScore: 0
    }
    if (input) {
      this.props.dispatch(newComment(comment.parentId))
      this.setState(() => ({
        input: ''
      }))
      e.preventDefault()
      this.props.dispatch(handleAddComment(comment)).then(() => {
        this.props.history.push(`/${selectedPost.category}/${selectedPost.id}`)
      })
    } else {
      alert('Please fill out all fields')
      e.preventDefault()
    }
  }

  render() {
    return (
      <section>
        <h2>Add Comment</h2>
        <form>
          <textarea onChange={this.updateInput} value={this.state.input} placeholder='body here'/>
          <button onClick={this.addComment}>Submit</button>
        </form>
      </section>
    )
  }
}

const mapStateToProps = ({posts}) => {
  return {
    posts
  }
}

export default connect(mapStateToProps)(AddComment);
