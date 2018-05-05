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

    signup() {
        const provider = new firebase.auth.GoogleAuthProvider();
        const auth = firebase.auth();
        auth.signInWithPopup(provider)
            .then((result) => {
                const user = result.user;
                console.log(result);
                this.setState({
                    currUser: user
                })
            });
    }

    render() {
        return (
            <div className="container">
                <p className="display-3">Sign in with your Google account to enable this skill</p>
                <img src={require('./images/google-signin.png')} alt="Sign in with Google" aria-label="Sign in with Google" onClick={evt => this.signup(evt)}></img>
            </div>
        )
    }
}