import React, { Component } from 'react';
import {connect} from 'react-redux'
import {handleAddPost} from '../actions/posts'
import {newPost} from '../actions/comments'
import '../App.css';

class AddPost extends Component {
  state = {
    bodyInput: '',
    headerInput: '',
    option: 'react'
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
  addPost = (e) => {
    let {bodyInput, headerInput, option} = this.state
    let timestamp = Date.now()
    let id = timestamp + bodyInput.split(' ').join('') + headerInput.split(' ').join('')
    let author = 'Test User'
    let post = {
      id: id,
      timestamp: timestamp,
      author: author,
      title: headerInput,
      body: bodyInput,
      deleted: false,
      category: option,
      commentCount: 0,
      voteScore: 0
    }
    if (bodyInput && headerInput) {
      e.preventDefault()
      this.setState(() => ({
        bodyInput: '',
        headerInput: '',
        option: ''
      }))
      this.props.dispatch(newPost(post))
      this.props.dispatch(handleAddPost(post)).then(() => {
        this.props.history.push('/')
      })
    } else {
      alert('Please fill out all fields')
      e.preventDefault()
    }
  }

  render() {
    const {categories} = this.props
    return (
      <section>
        <h2>Add Post</h2>
        <form>
          <input onChange={this.updateHeaderInput} value={this.state.headerInput} placeholder='Insert Header Text'/>
          <textarea onChange={this.updateBodyInput} value={this.state.bodyInput} placeholder='Insert Body Text'/>
          <select value={this.state.option} onChange={this.updateOption}>
            {categories.map((category) => (
              <option key={category.path} value={category.path}>{category.name}</option>
            ))}
          </select>
          <button onClick={this.addPost}>Submit</button>
        </form>
      </section>
    )
  }
}

const mapStateToProps = ({categories}) => {
  return {
    categories
  }
}

export default connect(mapStateToProps)(AddPost);
