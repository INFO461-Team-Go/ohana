import React from "react";
import firebase from "firebase/app";

export default class NewUserForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            fbError: undefined    
        };
    }
    handleSubmit(evt) {
        //prevent the browser's default behavior
        //so that it doesn't try to post the form data
        //back to the server
        evt.preventDefault();

        this.props.roommatesRef.push(this.state.name)
            .then(() => this.setState({name: "", fbError: undefined}))
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
                    value={this.state.name}
                    onInput={evt => this.setState({name: evt.target.value})}
                    placeholder="new roommate here"
                />
            </form>
        )
    }
}
