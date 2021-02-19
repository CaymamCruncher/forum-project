import React, { Component } from 'react';
import {connect} from 'react-redux'
import {formatTimestamp} from '../utils/API'
import {handleRemoveComment, handleChangeVote} from '../actions/comments'
import {subtractComment} from '../actions/posts'
import {Link} from 'react-router-dom'
import '../App.css';

class Comment extends Component {
  removeComment = (comment) => {
    this.props.dispatch(handleRemoveComment(comment))
    this.props.dispatch(subtractComment(comment.parentId))
  }

  updateScore = (value, number) => {
    const {comment} = this.props
    const object = {option: value, number, comment}
    this.props.dispatch(handleChangeVote(object))
  }

  render() {
    const {comment} = this.props
    return (
      <li key={comment.id}>
				<article className="post">
					<h3>{comment.author}</h3>
	        <p>{comment.body}</p>
					<small>{formatTimestamp(comment.timestamp)}</small>
	        <small>Comment score: {comment.voteScore}</small>
					<div>
		        <button className="post-button icon-trash" onClick={() => this.removeComment(comment)}></button>
		        <Link className="post-button icon-pencil" to={`/editComment/${comment.id}/${comment.parentId}`}></Link>
		        <button className="post-button icon-up" onClick={() => this.updateScore('upVote', 1)}></button>
		        <button className="post-button icon-down" onClick={() => this.updateScore('downVote', -1)}></button>
					</div>
				</article>
      </li>
    )
  }
}

const mapStateToProps = ({comments}) => {
  return {
    comments
  }
}
export default connect(mapStateToProps)(Comment);
