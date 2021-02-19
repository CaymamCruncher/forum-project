import React, { Component } from 'react';
import {connect} from 'react-redux'
import Comment from './Comment'
import '../App.css';

class CommentList extends Component {

  render() {
    const {comments, id} = this.props
    const correctComments = comments[0][id]
    const sortedComments = correctComments.sort((a, b) => a.timestamp < b.timestamp)
    return (
      <ul className="post-comments">
        {sortedComments.map((comment) => (
          <Comment key={comment.id} comment={comment}/>
        ))}
      </ul>
    )
  }
}

const mapStateToProps = ({comments}) => {
  return {
    comments
  }
}

export default connect(mapStateToProps)(CommentList);
