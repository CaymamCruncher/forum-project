import React, { Component } from 'react';
import {connect} from 'react-redux'
import {formatTimestamp} from '../utils/API'
import Post from './Post'
import '../App.css';

class Category extends Component {
  render() {
    const {posts, category} = this.props
    const selectedPosts = posts.filter((post) => post.category === category)
    const sortedPosts = selectedPosts.sort((a, b) => a.timestamp < b.timestamp)
    return (
      <ul className="list">
        {sortedPosts.map((post) => (
          <li className="list-item" key={post.id}>
            <Post post={post} timestamp={formatTimestamp(post.timestamp)}/>
          </li>
        ))}
      </ul>
    )
  }
}

const mapStateToProps = ({posts}) => {
  return {
    posts
  }
}

export default connect(mapStateToProps)(Category);
