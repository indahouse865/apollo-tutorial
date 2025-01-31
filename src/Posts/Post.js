import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
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
                                    <Mutation
                                        mutation={UPDATE_POST}
                                        variables={{
                                            id: post.id,
                                            check: !post.check
                                        }}
                                        optimisticResponse={{
                                            __typename: 'Mutation',
                                             updatePost: {
                                                  __typename: 'Post',
                                                  check: !post.check
                                             }
                                        }}
                                        update={ (cache, { data: { updatePost } }) => {
                                            const data = cache.readQuery({
                                                query: postQuery,
                                                variables: {
                                                    id: post.id
                                                }
                                            });
                                            data.post.check = updatePost.check;
                                            cache.writeQuery({
                                                query: postQuery,
                                                data: {
                                                    ...data,
                                                    post: data.post
                                                }
                                            })
                                        }}
                                    >
                                        {UpdatePost => (
                                            <input type="checkbox" checked={post.check}  onChange={UpdatePost} /> 
                                        )}  
                                    </Mutation>
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
        check
      }
    isEditMode @client
  }
`

const UPDATE_POST = gql`
    mutation updatePost($check: Boolean, $id: ID!) {
        updatePost(
            where:{
                id: $id,

            }
            data:{
                check: $check
            }
        ) {
            check
        }
    }
`