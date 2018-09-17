import React, { Component } from 'react';
import NavBar from './NavBar/NavBar'
import {Route} from 'react-router-dom'
import ShowCalculator from './ShowCalculator/ShowCalculator'

class Main extends Component {
  render() {
    return (
      <div>
        <Route path="/" component = {NavBar} />
        <Route path="/start" component = {ShowCalculator} />
      </div>
    );
  }
}

export default Main;
