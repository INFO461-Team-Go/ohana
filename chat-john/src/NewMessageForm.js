import React from "react";
import firebase from "firebase/app";

export default class NewMessageForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",  
            body: "",
            fbError: undefined    
        };
    }
    handleSubmit(evt) {
        //prevent the browser's default behavior
        //so that it doesn't try to post the form data
        //back to the server
        evt.preventDefault();

        //TODO: construct a new message object
        //and insert it as a child of the tasksRef
        //and handle any errors that might occur!
        let authorInfo = {
            displayName: this.props.user.displayName,
            uid: this.props.user.uid,
            photoURL: this.props.user.photoURL
        };

        let message = {
            author: authorInfo,
            body: this.state.body,
            createdAt: firebase.database.ServerValue.TIMESTAMP
        };
        this.props.channelRef.push(message)
            .then(() => this.setState({body: "", fbError: undefined}))
            .catch(err => this.setState({fbError: err}));
    }
    render() {
        return (
            <form onSubmit={evt => this.handleSubmit(evt)}>
                {
                    this.state.fbError ? 
                    <div className="alert alert-danger">{this.state.fbError.message}</div> : 
                    undefined
                }
                <input type="text" 
                    className="form-control"
                    value={this.state.body}
                    onInput={evt => this.setState({body: evt.target.value})}
                    placeholder="type your message here - hit 'enter' to submit"
                />
            </form>
        );
    }
}
