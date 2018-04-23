/**
 * Sign in view component for ohana!'s webapp. Uses Firebase for user authentication.
 */

import React from "react";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import constants from "./Constants";

export default class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }

    componentDidMount() {
        this.authUnsub = firebase.auth().onAuthStateChanged(user => {
            this.setState({ currentUser: user });
            !user ? undefined : this.props.history.push(constants.routes.channel);
        });
    }

    componentWillUnmount() {
        this.authUnsub();
    }

    handleSubmit(evt) {
        evt.preventDefault();
        console.log(this.state.email);
        console.log(this.state.password);
    }

    render() {
        return (
            // @TODO: Display warnings when the user enters invalid email / incorrect password
            <div className="container">
                <h1 className="display-3">Sign In</h1>
                <form onSubmit={evt => this.handleSubmit(evt)}>
                    <div className="form-group">
                        <label htmlFor="email" className="lead">Email</label>
                        <input type="email" className="form-control" placeholder="enter your email address" value={this.state.email} onInput={evt => this.setState({ email: evt.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="lead">Password</label>
                        <input type="password" className="form-control" placeholder="enter your password" value={this.state.password} onInput={evt => this.setState({ password: evt.target.value })} />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary lead">Sign In</button>
                    </div>
                </form>
                <p className="lead">Don't have an account yet? <Link to={constants.routes.signup} className="text-primary">Get ohana! for Alexa</Link></p>
            </div>
        )
    }
}