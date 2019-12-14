import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class PostForm extends Component {

    static propTypes = {
        onSubmit: PropTypes.func.isRequired
    }

    static defaultProps = {
        post: {}
    }

    state = {
        id: this.props.post.id || "",
        title: this.props.post.title || "",
        body: this.props.post.body || ""
    }

    handleInput = e => {
        const formData = {}
        formData[e.target.name] = e.target.value;
        this.setState({...formData})
    }

    
    render() {
        const { onSubmit } = this.props
        const { title, body, id } = this.state
        return (
            <form onSubmit={(e) => {
                e.preventDefault();
                onSubmit({
                    variables: {
                        title,
                        body,
                        id
                    }
                }).then(() => {
                    this.setState({
                        title: '',
                        body: ''
                    });
                })
                .catch(e => console.log(`Error is: ${e}`))
            }}>
                <input type="text" onChange={this.handleInput} value={this.state.title} name="title" placeholder="title"/>
                <textarea type="text" onChange={this.handleInput} value={this.state.body} name="body" placeholder="body"/> 
                <button>Submit</button>
            </form>   
        )
    }
}
