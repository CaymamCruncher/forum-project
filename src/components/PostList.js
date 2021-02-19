import React, { Component } from 'react';
import {connect} from 'react-redux'
import {formatTimestamp} from '../utils/API'
import Post from './Post'
import '../App.css';

class PostList extends Component {
  state = {
    sortedPosts: []
  }

  sortPosts = (e) => {
    const {posts} = this.props
		if (e.target.value === 'popular') {
			let sortedPosts = posts.sort((a, b) => a.voteScore < b.voteScore)
			this.setState(() => ({
				sortedPosts
			}))
		} else if (e.target.value === 'new') {
      let sortedPosts = posts.sort((a, b) => a.timestamp < b.timestamp)
      this.setState(() => ({
        sortedPosts
      }))
    } else {
      let sortedPosts = posts.sort((a, b) => a.timestamp > b.timestamp)
      this.setState(() => ({
        sortedPosts
      }))
    }
  }

  render() {
    let sortedPosts = this.state.sortedPosts.length > 0 ? this.state.sortedPosts : this.props.posts.sort((a, b) => a.timestamp < b.timestamp)
    return (
			<article>
				<select onChange={this.sortPosts}>
					<option value='new'>New</option>
					<option value='old'>Old</option>
					<option value='popular'>Popular</option>
				</select>
	      <ul>
	        {sortedPosts.map((post) => (
	          <li key={post.id}>
	            <Post post={post} timestamp={formatTimestamp(post.timestamp)}/>
	          </li>
	        ))}
	      </ul>
			</article>
    )
  }
}

//using mapStateToProps triggers rerender when comment is subtracted
const mapStateToProps = ({posts}) => {
  return {
    posts
  }
}

export default connect(mapStateToProps)(PostList);
