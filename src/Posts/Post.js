import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost';
import UpdatePost from './UpdatePost';

export default class Post extends Component {
    render() {
        const { match } = this.props;
        return (
            <Query query={postQuery}
                variables={{
                    id: match.params.id
                }}
            >
                {({data, loading}) => {
                    if (loading) return 'Loading';
                    const { post } = data;
                    return (
                        <div>
                            <section>
                                <h1>{post.title}</h1>
                            </section>
                            <section>
                                <h1>Edit Post</h1>
                                <UpdatePost post={post}/>
                            </section>
                        </div>
                    )
                }}

            </Query>
        )
    }
}

const postQuery = gql`
  query post( $id: ID! ) {
    post(where: { id: $id }) {
        id
        title
        body
      }
  }
`