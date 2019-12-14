import React from 'react';
import ApolloClient from 'apollo-boost';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import Post from './Posts/Post'
import Posts from './Posts/Posts'
import NewPost from './Posts/NewPost'


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
          <Link to={'/'}>
            <img src={logo} className="App-logo" alt="logo" />
          </Link>
          <Link to={'/post/new'}>New Post Form</Link>
          <Switch>
            <Route exact path="/" component={Posts}/>
            <Route exact path="/post/new" component={NewPost}/>
            <Route path="/post/:id" component={Post}/>
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
