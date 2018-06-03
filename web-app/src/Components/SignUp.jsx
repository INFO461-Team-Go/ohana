/**
 * Sign Up View for the O'hana App
 */

import React from "react";
import { Link } from "react-router-dom";
import constants from "./Constants"
import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/database';
import Header from "./Header";
import md5 from "blueimp-md5";


export default class SignUp extends React.Component {

    componentDidMount() {
        //listen for auth change
        this.authUnsub = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.history.push(constants.routes.signin)
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

    handleSubmit(evt) {
        evt.preventDefault();
        if (this.state.pw !== this.state.cpw) {
            return;
        } else if (this.state.displayName === "") {
            this.setState({
                errorMessage: "Enter Display Name"
            });
            return;
        } else if (!/^[a-zA-Z]+$/.test(this.state.displayName.trim())) {
            this.setState({
                errorMessage: "No special characters allowed for display name"
            });
        } else if (this.state.pw.length < 6) {
            this.setState({
                errorMessage: "Password must be at least six characters"
            });
            return;
        } else {
            let hash = md5(this.state.email);
            let ref = firebase.database().ref(hash + "/roommates/");
            let toUpdate = { count: 0 };
            // console.log(this.state.photoUrl)
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.pw)
            .then(user => user.updateProfile({
                displayName: this.state.displayName
            }))
            .catch(err => this.setState({
                errorMessage: err.message
            }));
        }
    }

    render() {
        // @TODO: Display warning: Can only sign up through the Alexa App
        return (
            <div>
                <Header />
                <h2 className='sloganS' id="sloganOverRide"><span className="thicker">sign up</span> with <span className="thicker">Amazon</span> email</h2>
                <h2 id="subSloganS">alexa will <span className='thickerOverRide'>NOT</span> work if you don't sign up with your <span className='thickerOverRide'>AMAZON</span> email</h2>
                <div className="test m-auto card" id="testSignUp">
                    <div className="card-body p-0">
                        {this.state.errorMessage ?
                            <div className="alert alert-danger">
                                {this.state.errorMessage}
                            </div> :
                            undefined
                        }
                        <form onSubmit={evt => this.handleSubmit(evt)}>
                            <h2 className="inputSignUp" id="starterMargin">display name</h2>
                            <div className="form-group">
                                <input id="dName" className="textBox form-control"
                                    type="text"
                                    value={this.state.displayName}
                                    onInput={evt => this.setState({ displayName: evt.target.value })}
                                />
                            </div>
                            <h2 className="inputSignUp">amazon email</h2>
                            <div className="form-group">
                                <input id="email" className="textBox form-control"
                                    type="email"
                                    value={this.state.email}
                                    onInput={evt => this.setState({
                                        email: evt.target.value,
                                    })}
                                />
                            </div>
                            <h2 className="inputSignUp">password</h2>
                            <div className="form-group">
                                <input id="pw" className="textBox form-control"
                                    type="password"
                                    value={this.state.pw}
                                    onInput={evt => this.setState({ pw: evt.target.value })}
                                />
                            </div>
                            <h2 className="inputSignUp">confirm password</h2>
                            <div className="form-group">
                                <input id="cpw" className="textBox form-control"
                                    type="password"
                                    value={this.state.cpw}
                                    onInput={evt => this.setState({ cpw: evt.target.value })}
                                />
                                {this.state.cpw !== this.state.pw ?
                                    <p className="text-danger" id="alignE">
                                        Passwords do not match
                                    </p> :
                                    undefined
                                }
                            </div>
                            <div className="form-group" id="centerMargin">
                                <button type="submit" className="btn btn-primary signin" id="signinOverRide">sign up</button>
                            </div>
                        </form>
                        <h2 className="signup" id="marginCorrection">Already have an account? <Link to={constants.routes.signin} className="text-white">sign in</Link></h2>
                    </div>
                </div>
            </div>
        );
    }
}