import React, { Component } from 'react'
import PostForm from './PostForm' 
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'; 

export default class NewPost extends Component {

    render() {
        return (
            <div>
                <h1>New Post</h1>
                <Mutation
                    mutation={NEW_POST}
                >
                    {( createPost, result) => {
                        const onSuccess = () => {
                            this.props.history.push('/');
                        }
                        return <PostForm onSubmit={createPost} onSuccess={onSuccess}/>
                    }}
                </Mutation>
            </div>
        )
    }
}


const NEW_POST = gql`
    mutation addPost($title: String!, $body: String! ) {
        createPost(data:{
            status: PUBLISHED
            title: $title
            body: $body
        }) {
            title
            body
            id
        }
    }
`