import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Main from './TravellerComponents/Main'
import logo from './logo.svg';
import './App.css';
import { store } from './store'
import { Provider } from 'react-redux'
import LoginNavBar from './LoginNavBar';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Main />
          </div>
        </BrowserRouter>
      </Provider>

    );
  }
}

export default App;
