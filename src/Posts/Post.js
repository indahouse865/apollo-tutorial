import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost';
import UpdatePost from './UpdatePost';
import EditMode from './EditMode';

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
                    const { post, isEditMode } = data;
                    return (
                        <div>
                            <EditMode isEditMode={isEditMode} />
                            { isEditMode ? (
                                <section>
                                    <h1>Edit Post</h1>
                                    <UpdatePost post={post}/>
                                </section>
                            ) : (
                                <section>
                                    <h1>{post.title}</h1>
                                    <p>{post.body}</p>
                                </section>
                            )}
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
    isEditMode @client
  }
`