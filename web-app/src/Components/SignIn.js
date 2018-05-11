/**
 * Sign in view component for ohana!'s webapp. Uses Firebase for user authentication.
 */

import React from "react";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import constants from "./Constants";
import "firebase/auth";


const cardStyle = {
    width: "18rem"
}

export default class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {


        this.authUnsub = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.history.push(constants.routes.views);
            }
        })
    }

    componentWillUnmount() {
        this.authUnsub();
    }

    signin(evt) {
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
        console.log(this.state.currUser);
    }

    render() {
        return (
            <div className="container">
                <img src={require('./images/google-signin.png')} alt="Sign in with Google" aria-label="Sign in with Google" onClick={evt => this.signin(evt)}></img>
            </div>
        )
    }
}

