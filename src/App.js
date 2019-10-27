import React from 'react';
import ApolloClient from 'apollo-boost';
import logo from './logo.svg';
import './App.css';
import { gql } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks'
import { Query } from 'react-apollo'


const client = new ApolloClient({
  uri: 'https://api-useast.graphcms.com/v1/ck294t2s134vc01hi2di9eldf/master'
});

const testQuery = gql`
  {
    posts {
      id
      title
      body
      createdAt
    }
  }
`

//Run query from outside of react
// client.query({
//   query: testQuery
// }).then(res => console.log(res))

function App() {
  return (
    <ApolloProvider client={client}>  

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
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
