import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom'

// import Posts from './Query.Posts.graphql'

export default class Posts extends Component {
    render() {
        return (
          <div>
            <Link className="button" to={'/post/new'}>New Post Form</Link>
            <ul className="Posts-Listing">
              <Query query={postsQuery}>
                  {({loading, data, fetchMore}) => {
                      if (loading) return "Loading...";
                      const { posts } = data;
                      return (
                        <React.Fragment>
                          {posts.map(post => (
                            <li key={post.id}>
                                <Link to={`post/${post.id}`}>
                                    {post.title}
                                </Link>
                            </li>
                          ))}
                          <li><button onClick={() => fetchMore({
                            variables: {
                              skip: posts.length
                            },
                            updateQuery: (prev, { fetchMoreResult }) => {
                                if (!fetchMoreResult) return prev;
                                return Object.assign({}, prev, {
                                   posts: [...prev.posts, ...fetchMoreResult.posts]
                                })
                            }
                          })}>Load More</button></li>
                        </React.Fragment>
                      )
                  }}
              </Query>
            </ul>
          </div>
        )
    }
}


const postsQuery = gql`
  query allPosts($skip: Int) {
    posts(orderBy: createdAt_DESC, first: 3, skip: $skip ) {
      id
      title
      body
      createdAt
    }
  }
`