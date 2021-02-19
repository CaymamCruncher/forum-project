import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import '../App.css';

class ErrorPage extends Component {

  render() {
    return (
      <section>
        <h2>Sorry the page you are looking for cannot be found</h2>
        <Link to='/'>Back to homepage</Link>
      </section>
    )
  }
}

export default connect()(ErrorPage);
