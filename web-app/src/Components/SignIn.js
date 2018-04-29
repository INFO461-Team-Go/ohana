/**
 * Sign in view component for ohana!'s webapp. Uses Firebase for user authentication.
 */

import React from "react";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import constants from "./Constants";
import "firebase/auth";

export default class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }

    componentDidMount() {
        // this.authUnsub = firebase.auth().onAuthStateChanged(user => {
        //     this.setState({ currentUser: user });
        //     !user ? undefined : this.props.history.push(constants.routes.channel);
        // });
        console.log("signin view mounted");
        this.authUnsub = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.history.push(constants.routes.views);
            }
        })
    }

    componentWillUnmount() {
        this.authUnsub();
        console.log("login view will unmount");
    }

    handleSubmit(evt) {
        evt.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .catch(err => this.setState({fberror: err}))
    }

    render() {
        return (
            // @TODO: Display warnings when the user enters invalid email / incorrect password
            <div>
                <header className="bg-secondary py-1">
                    <div className="container text-white">
                        o'hana
                    </div>
                </header>
                <div className="container-fluid my-3">
                    {
                        this.state.fberror ?
                            <div className="alert alert-danger">
                                {this.state.fberror.message}
                            </div> :
                                undefined
                    }
                    <div className="container"> 
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
                    <p className="">Don't have an account yet? <Link to={constants.routes.signup} className="text-primary">Get ohana! for Alexa</Link></p>
                    </div>
                </div>
            </div>
        )
    }
}

