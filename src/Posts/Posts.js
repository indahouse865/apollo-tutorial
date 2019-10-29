import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom'

export default class Posts extends Component {
    render() {
        return (
            <ul>

            <Query query={postsQuery}>
                {({loading, data}) => {
                    if (loading) return "Loading...";
                    const { posts } = data;
                    return posts.map(post => (
                        <li>
                            <Link key={post.id} to={`post/${post.id}`}>
                                <h1>{post.title}</h1>
                            </Link>
                        </li>
                    ))
                }}
            </Query>
          </ul>
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