import React, { Component } from 'react';
import {connect} from 'react-redux'
import {handleRemovePost, handleChangeScore} from '../actions/posts'
import {Link} from 'react-router-dom'
import {formatTimestamp} from '../utils/API'
import CommentList from './CommentList'
import '../App.css';

class PostView extends Component {
  state = {
    showComments: false
  }

  removePost = (post) => {
    this.props.dispatch(handleRemovePost(post))
    this.props.history.push('/')
  }

  updateScore = (value, number) => {
		const {postId} = this.props.match.params
		const {posts} = this.props
		const post = posts.filter((post) => post.id === postId)[0]
    const object = {option: value, number, post}
    this.props.dispatch(handleChangeScore(object))
  }

  toggleComments = () => {
    this.setState((prevState) => ({
      showComments: !prevState.showComments
    }))
  }

  componentDidUpdate() {
    const {postId} = this.props.match.params
    const {posts} = this.props
    const post = posts.filter((post) => post.id === postId)[0]
    if (!post) {
      this.props.history.push('/404')
    }
  }

  render() {
    const {postId} = this.props.match.params
    const {posts} = this.props
    const post = posts.filter((post) => post.id === postId)[0]
    const {category} = this.props.match.params
    const {categories} = this.props
    if (categories.filter((existingCategory) => existingCategory.path === category).length === 0) {
      return null
    }
    return (
      <article className="post" key={post.id}>
        <h2>{post.title}</h2>
        <small>Posted By {post.author}</small>
        <small>Category: {post.category}</small>
        <p>{post.body}</p>
				<small>{formatTimestamp(post.timestamp)}</small>
        <small>Number of Comments: {post.commentCount}</small>
        <small>Post score: {post.voteScore}</small>
				<div>
	        <button className="post-button icon-trash" onClick={() => this.removePost(post)}></button>
	        <Link className="post-button icon-pencil" to={`/editPost/${post.id}`}></Link>
	        <Link className="post-button icon-comment" to={`/addComment/${post.id}`}></Link>
					<button className="post-button icon-comment-alt" onClick={this.toggleComments}></button>
					<button className="post-button icon-up" onClick={() => this.updateScore('upVote', 1)}></button>
					<button className="post-button icon-down" onClick={() => this.updateScore('downVote', -1)}></button>
				</div>
        {this.state.showComments && (
          <CommentList id={post.id}/>
        )}
      </article>
    )
  }
}

const mapStateToProps = ({posts, categories}) => {
  return {
    posts,
    categories
  }
}


export default connect(mapStateToProps)(PostView);
