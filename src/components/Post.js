import React, { Component } from 'react';
import {connect} from 'react-redux';
import {handleRemovePost, handleChangeScore} from '../actions/posts';
import {Link} from 'react-router-dom';
import '../fonts/fontello.css';
import '../App.css';

class Post extends Component {

  removePost = () => {
    const {post} = this.props
    this.props.dispatch(handleRemovePost(post))
  }

  updateScore = (value, number) => {
    const {post} = this.props
    const object = {option: value, number, post}
    this.props.dispatch(handleChangeScore(object))
  }

  render() {
    const {post, timestamp} = this.props
    return (
      <article className="post">
				<Link to={`/${post.category}/${post.id}`}><h2>{post.title}</h2></Link>
        <small>{timestamp}</small>
        <small>Posted By {post.author}</small>
        <small>Category: {post.category}</small>
        <small>Number of Comments: {post.commentCount}</small>
        <small>Post score: {post.voteScore}</small>
				<div>
	        <button className="post-button icon-trash" onClick={this.removePost}></button>
	        <Link className="post-button icon-pencil" to={`/editPost/${post.id}`}></Link>
	        <button className="post-button icon-up" onClick={() => this.updateScore('upVote', 1)}></button>
	        <button className="post-button icon-down" onClick={() => this.updateScore('downVote', -1)}></button>
				</div>
      </article>
    )
  }
}

const mapStateToProps = ({posts}) => {
  return {
    posts
  }
}


export default connect(mapStateToProps)(Post);
