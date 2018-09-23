import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';
import Main from './TravellerComponents/Main'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Main />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
