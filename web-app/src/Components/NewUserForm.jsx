import React from "react";
import firebase from "firebase/app";

let greyButton = {
    color: "#8B8B8B"
}

let redButton = {
    color: "#FF4D4D"
}
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

        // this.props.roommatesRef.push(this.state.name)
        //     .then(() => this.setState({name: "", fbError: undefined}))
        //     .catch(err => this.setState({fbError: err}));
    }
    render() {
        return (
            <div className="container">
                <form id="formBox" className="mx-auto" onSubmit={evt => this.handleSubmit(evt)}>
                    {
                        this.state.fbError ? 
                        <div className="alert alert-danger">{this.state.fbError.message}</div> : 
                        undefined
                    }
                    <input type="text" 
                        className="form-control form-control-sm mx-auto"
                        id="inputBox"
                        value={this.state.name}
                        onInput={evt => this.setState({name: evt.target.value})}
                        placeholder="new roommate here"
                    />
                    <div className="row mx-auto px-1">
                        <h4 className="col text-center m-1" id="newCardButton" style={redButton}>cancel</h4>
                        <h4 className="col text-center m-1" id="newCardButton" style={greyButton}>add</h4>
                    </div>
                </form>
            </div>
        )
    }
}
