import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Main from './TravellerComponents/Main'
import logo from './logo.svg';
import './App.css';
import { store } from './store'
import { Provider } from 'react-redux'
import LoginNavBar from './LoginNavBar';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

//apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:3001/graphql"
})
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
          <BrowserRouter>
            <div>
              <Main />
            </div>
          </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
