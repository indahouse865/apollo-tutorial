import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Post from './Posts/Post'
import Posts from './Posts/Posts'
import NewPost from './Posts/NewPost'

function App() {
  return (
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
  );
}

export default App;
