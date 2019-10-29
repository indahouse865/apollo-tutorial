import React from 'react';
import ApolloClient from 'apollo-boost';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import Post from './Posts/Post'
import Posts from './Posts/Posts'


const client = new ApolloClient({
  uri: 'https://api-useast.graphcms.com/v1/ck294t2s134vc01hi2di9eldf/master'
});


//Run query from outside of react
// client.query({
//   query: testQuery
// }).then(res => console.log(res))

function App() {
  return (
    <ApolloProvider client={client}>  
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
              >
              Learn React
            </a> 
            <Switch>
              <Route exact path="/" component={Posts}/>
              <Route path="/post/:id" component={Post}/>
            </Switch>
          </header>

        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
