/**
 * Sign Up View for the O'hana App
 */

import React from "react";
import { Link } from "react-router-dom";
import constants from "./Constants"
import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/database';

export default class SignUp extends React.Component {

    componentDidMount() {
        //listen for auth change
        this.authUnsub = firebase.auth().onAuthStateChanged(user => {
            if(user){
                this.props.history.push('/channels/view/SignIn')
            }
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            displayName: "",
            email: "",
            pw: "",
            cpw: "",
            errorMessage: undefined
        }
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
        );
    }
}