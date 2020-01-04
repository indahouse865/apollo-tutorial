import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom'

export default class Posts extends Component {
    render() {
        return (
          <div>
            <Link className="button" to={'/post/new'}>New Post Form</Link>
            <ul className="Posts-Listing">
              <Query query={postsQuery}>
                  {({loading, data}) => {
                      if (loading) return "Loading...";
                      const { posts } = data;
                      return posts.map(post => (
                          <li key={post.id}>
                              <Link to={`post/${post.id}`}>
                                  {post.title}
                              </Link>
                          </li>
                      ))
                  }}
              </Query>
            </ul>
          </div>
        )
    }
}


const postsQuery = gql`
  query allPosts {
    posts {
      id
      title
      body
      createdAt
    }
  }
`