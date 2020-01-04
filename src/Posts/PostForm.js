import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class PostForm extends Component {

    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        post: PropTypes.object,
        onSuccess: PropTypes.func
    }

    static defaultProps = {
        post: {},
        onSuccess: () => {}
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
        const { onSubmit, onSuccess } = this.props
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
                    onSuccess()
                })
                .catch(e => console.log(`Error is: ${e}`))
            }}>
                <input type="text" onChange={this.handleInput} value={this.state.title} name="title" placeholder="title"/>
                <textarea type="text" onChange={this.handleInput} value={this.state.body} name="body" placeholder="body"/> 
                <button className="button">Submit</button>
            </form>   
        )
    }
}
