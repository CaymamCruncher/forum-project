import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux'
import {Link, Route, withRouter} from 'react-router-dom'
import PostList from './PostList'
import Category from './Category'
import AddComment from './AddComment'
import AddPost from './AddPost'
import EditPost from './EditPost'
import EditComment from './EditComment'
import PostView from './PostView'
import ErrorPage from './ErrorPage'
import '../App.css';

class Dashboard extends Component {
  render() {
    const {categories} = this.props
    return (
      <Fragment>
				<header>
					<div>
						<Link to="/"><h1>Tofts Forum</h1></Link>
		        <nav className="nav-bar">
		          {categories.map((category) => (
		            <Link className="nav-link" to={`/${category.path}`} key={category.name}>{category.name}</Link>
		          ))}
		          <Link className="nav-link" to='/addPost'>New Post</Link>
		        </nav>
					</div>
				</header>
        <Route exact path='/' component={PostList} />
        {categories.map((category) => (
          <Route exact key={category.name} path={`/${category.path}`} render={() => {
            return <Category category={category.path} />
          }}/>
        ))}
        <Route path='/addComment/:parentId' component={AddComment} />
        <Route path='/addPost' component={AddPost} />
        <Route path='/editPost/:postId' component={EditPost} />
        <Route path='/editComment/:commentId/:parentId' component={EditComment} />
        <Route path='/:category/:postId' component={PostView} />
        <Route path='/404' component={ErrorPage} />
      </Fragment>
    )
  }
}

const mapStateToProps = ({categories}) => {
  return {
    categories
  }
}

export default withRouter(connect(mapStateToProps)(Dashboard));
