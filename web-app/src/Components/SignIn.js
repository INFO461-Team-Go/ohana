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
                    <h4 className="container text-white">
                        o'hana
                    </h4>
                </header>
                <div className="container text-white my-3"> Let Alexa Keep Track of Tasks </div>
                <div className="container my-5">
                    {
                        this.state.fberror ?
                            <div className="alert alert-danger">
                                {this.state.fberror.message}
                            </div> :
                                undefined
                    }
                    <div className="container py-5 px-sm-5"> 
                        <div className="container bg-secondary py-5 px-sm-5">
                            <div className="container">
                                <form onSubmit={evt => this.handleSubmit(evt)}>
                                    <div className="py-md-5 px-md-5 mx-md-5">
                                        <div className="form-group row mx-lg-5">
                                            <div className="col-lg-4">
                                                <label htmlFor="email" className="text-white col-form-label">email:</label>
                                            </div>
                                            <div className="col-lg-8">
                                                <input type="email" className="form-control" placeholder="enter your email address" value={this.state.email} onInput={evt => this.setState({ email: evt.target.value })}/>
                                            </div>
                                        </div>
                                        <div className="form-group row mx-lg-5">
                                            <div className="col-lg-4">
                                                <label htmlFor="password" className="text-white col-form-label">password:</label>
                                            </div>
                                            <div className="col-lg-8">
                                                <input type="password" className="form-control" placeholder="enter your password" value={this.state.password} onInput={evt => this.setState({ password: evt.target.value })} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row justify-content-center">
                                        <button type="submit" className="btn btn-white lead px-3">sign in</button>
                                    </div>
                                    <p className="row justify-content-center"><Link to={constants.routes.signup} className="text-white">sign up</Link></p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

