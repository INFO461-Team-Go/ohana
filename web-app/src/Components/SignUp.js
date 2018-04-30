/**
 * 
 */

import React from "react";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import constants from "./Constants";

export default class SignUp extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.authUnsub = firebase.auth().onAuthStateChanged(user => {
            this.setState({ currentUser: user });
        });
    }

    componentWillUnmount() {
        this.authUnsub();
    }

    render() {
        // @TODO: Display warning: Can only sign up through the Alexa App
        return (
            <div className="container">
                <h1 className="display-3">Sign Up!</h1>
                <div class="alert alert-info" role="alert">
                    Make sure you sign up through the Amazon Alexa app!
                </div>
                <form>
                    
                </form>
            </div>
        )
    }
}