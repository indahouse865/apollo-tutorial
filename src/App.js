import React from 'react';
import ApolloClient from 'apollo-boost';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import Post from './Posts/Post'
import Posts from './Posts/Posts'
import NewPost from './Posts/NewPost'

const defaultState = {
  isEditMode: false,
}

const client = new ApolloClient({
  uri: 'https://api-useast.graphcms.com/v1/ck294t2s134vc01hi2di9eldf/master',
  clientState: {
    defaults: defaultState,
    resolvers: {}
  }
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
          <div className="App-header">
            <h1>
              <Link to={'/'} className="headerLink">GraphQL Tutorial</Link>
            </h1>
          </div>
          <main>
            <Switch>
              <Route exact path="/" component={Posts}/>
              <Route exact path="/post/new" component={NewPost}/>
              <Route path="/post/:id" component={Post}/>
            </Switch>
          </main>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
