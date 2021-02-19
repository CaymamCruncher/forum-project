import React, { Component } from 'react';
import {connect} from 'react-redux'
import {handleEditPost} from '../actions/posts'
import '../App.css';

class EditPost extends Component {
  state = {
    bodyInput: '',
    headerInput: '',
    option: ''
  }

  //update inputs
  updateBodyInput = (e) => {
    let bodyInput = e.target.value
    this.setState(() => ({
      bodyInput
    }))
  }

  updateHeaderInput = (e) => {
    let headerInput = e.target.value
    this.setState(() => ({
      headerInput
    }))
  }

  updateOption = (e) => {
    let option = e.target.value
    this.setState(() => ({
      option
    }))
  }

  //addPost after forming it
  editPost = (e) => {
    let {bodyInput, headerInput, option} = this.state
    const {posts} = this.props
    const {postId} = this.props.match.params
    const oldPost = posts.filter((post) => post.id === postId)[0]
    let post = {
      id: oldPost.id,
      timestamp: oldPost.timestamp,
      author: oldPost.author,
      title: headerInput,
      body: bodyInput,
      deleted: false,
      category: option,
      commentCount: oldPost.commentCount,
      voteScore: oldPost.voteScore
    }
    if (bodyInput && headerInput) {
      e.preventDefault()
      this.setState(() => ({
        bodyInput: '',
        headerInput: '',
        option: ''
      }))
      this.props.dispatch(handleEditPost(post)).then(() => {
        this.props.history.push(`/${option}/${oldPost.id}`)
      })
    } else {
      alert('Please fill out all fields')
      e.preventDefault()
    }
  }

  componentDidMount() {
    const {posts} = this.props
    const {postId} = this.props.match.params
    const post = posts.filter((post) => post.id === postId)[0]
    if (post) {
      this.setState(() => ({
        headerInput: post.title,
        bodyInput: post.body,
        option: post.category
      }))
    } else {
      this.props.history.push('/')
    }
  }

  render() {
    const {categories} = this.props
    return (
      <section>
        <h2>Edit Post</h2>
        <form>
          <input onChange={this.updateHeaderInput} value={this.state.headerInput} placeholder='Insert Header Text'/>
          <textarea onChange={this.updateBodyInput} value={this.state.bodyInput} placeholder='Insert Body Text'/>
          <select value={this.state.option} onChange={this.updateOption}>
            {categories.map((category) => (
              <option key={category.path} value={category.path}>{category.name}</option>
            ))}
          </select>
          <button onClick={this.editPost}>Submit</button>
        </form>
      </section>
    )
  }
}

const mapStateToProps = ({categories, posts}) => {
  return {
    categories,
    posts
  }
}

export default connect(mapStateToProps)(EditPost);
