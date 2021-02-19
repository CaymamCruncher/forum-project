import React, { Component } from 'react';
import {connect} from 'react-redux'
import {handleInitialData} from '../actions/index'
import {withRouter} from 'react-router-dom'
import Dashboard from './Dashboard'
import '../App.css';

class App extends Component {
  componentDidMount() {
    const {dispatch} = this.props
    dispatch(handleInitialData())
  }

  render() {
    return (
      <div className="App">
        <Dashboard />
      </div>
    )
  }
}

export default withRouter(connect()(App));
