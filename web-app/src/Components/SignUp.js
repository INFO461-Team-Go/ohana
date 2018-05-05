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

    handleSubmit(evt){
        evt.preventDefault(); 
        if(this.state.pw != this.state.cpw){
            return;
        } else if(this.state.displayName == ""){
            this.setState({
                errorMessage: "Enter Display Name"
            });  
            return;
        } else if(this.state.pw.length < 6) {
            this.setState({
                errorMessage: "Password must be at least six characters"
            });  
            return;
        }else {
            console.log(this.state.photoUrl)
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.pw)
            .then(user => user.updateProfile({
                photoURL: this.state.photoUrl,
                displayName: this.state.displayName
            }))
            .catch(err => this.setState({
                errorMessage: err.message
            }));
        }

        this.authUnsub = firebase.auth().onAuthStateChanged(user => {
            this.setState({ currentUser: user });
        });
    }

    render() {
        // @TODO: Display warning: Can only sign up through the Alexa App
        return (
        <div>
            <header className="bg-secondary py-1">
                    <h4 className="container text-white my-1">
                        ohana!
                    </h4>
            </header>
            <div className="container">
                <div className="card-body p-5 text-center">
                    {this.state.errorMessage ?
                        <div className="alert alert-danger">
                            {this.state.errorMessage}
                        </div> :
                        undefined
                    }
                    <h1 className="mb-3">Sign Up</h1>
                    <form onSubmit={evt => this.handleSubmit(evt)}>
                        <div className="form-group">
                            <input id="dName" className="form-control"
                            type="text" 
                            placeholder="Display Name"
                            value={this.state.displayName}
                            onInput={evt => this.setState({displayName: evt.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <input id="email" className="form-control"
                            type="email"
                            placeholder="Email"
                            value={this.state.email}
                            onInput={evt => this.setState({
                                email: evt.target.value,
                            })}
                            />
                        </div>
                        <div className="form-group">
                            <input id="pw" className="form-control"
                            type="password"
                            placeholder="Password"
                            value={this.state.pw}
                            onInput={evt => this.setState({pw: evt.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <input id="cpw" className="form-control"
                            type="password"
                            placeholder="Confirm Password"
                            value={this.state.cpw}
                            onInput={evt => this.setState({cpw: evt.target.value})}
                            />
                            {this.state.cpw != this.state.pw ?
                                <p className="text-danger">
                                    Passwords do not match
                                </p> :
                                undefined
                            }
                        </div>
                        <div className="form-group">
                            <button type="submit" class="btn btn-white w-25 py-0">Sign Up</button>
                        </div>
                    </form>
                    <p>Already have an account? <Link to={constants.routes.signin}>Sign In!</Link></p>
                </div>
            </div>
        </div>
        );
    }
}