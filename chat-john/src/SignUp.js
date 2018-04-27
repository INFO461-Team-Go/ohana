import React from "react";
import {Link} from "react-router-dom";
import {ROUTES} from "./constants";
import firebase from "firebase/app";
import "firebase/auth";
import md5 from "blueimp-md5"

export default class SignUpView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName: "",
            email: "",
            password: "",
            passwordCheck: ""
        }
    }

    componentDidMount() {
        console.log("sign up view did mount");
        this.unlistenAuth = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                let user = firebase.auth().currentUser;
                let hash = md5(this.state.email);
                user.updateProfile({
                    displayName: this.state.displayName,
                    photoURL: `https://www.gravatar.com/avatar/${hash}`
                })
                    .then(() => this.props.history.push(ROUTES.generalChannel))
                    .catch(err => this.setState({fberror: err}))
                console.log(user);
            } 
        });

    }

    componentWillUnmount() {
        console.log("signup view will unmount");
        this.unlistenAuth();
    }

    handleSubmit(evt) {
        evt.preventDefault();
        //do your authentication
        // if it was successful, then

        if (this.state.password !== this.state.passwordCheck) {
            this.setState({passError: "Passwords do not match"});
        } else if (!this.state.displayName) {
            this.setState({dnameError: "Display name cannot be empty"});
            this.setState({dname: undefined})
            this.setState({email: undefined})
        } else if (!this.state.email) {
            this.setState({emailError: "Email cannot be empty"});
            this.setState({dname: undefined})
            this.setState({email: undefined})
        } else {
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                .catch(err => this.setState({fberror: err}))
        }
    }

    render() {
        return (
            <div>
                <header className="jumbotron jumbotron-fluid bg-info text-white">
                    <div className="container">
                        <h1>Sign Up</h1>
                    </div>
                </header>
                <main>
                    <div className="container">
                        {
                            this.state.fberror ?
                                <div className="alert alert-danger">
                                    {this.state.fberror.message}
                                </div> :
                                undefined
                        }  
                        <form onSubmit={evt => this.handleSubmit(evt)}>
                            <div className="form-group">
                                <label htmlFor="displayName">Display Name</label>
                                <input type="text"
                                    id="displayName"
                                    className="form-control"
                                    placeholder="your display name"
                                    value={this.state.displayName}
                                    onInput={evt => this.setState({displayName: evt.target.value})}/>
                            </div>
                            {
                            this.state.dnameError ?
                                <div className="alert alert-danger">
                                    {this.state.dnameError}
                                </div> :
                                undefined
                            } 
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input type="text"
                                    id="email"
                                    className="form-control"
                                    placeholder="your email address"
                                    value={this.state.email}
                                    onInput={evt => this.setState({email: evt.target.value})}/>
                            </div>
                            {
                            this.state.emailError ?
                                <div className="alert alert-danger">
                                    {this.state.emailError}
                                </div> :
                                undefined
                            } 
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password"
                                    id="password"
                                    className="form-control"
                                    placeholder="your password"
                                    value={this.state.password}
                                    onInput={evt => this.setState({password: evt.target.value})}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="passwordCheck">Confirm Password</label>
                                <input type="password"
                                    id="passwordCheck"
                                    className="form-control"
                                    placeholder="retype your password"
                                    value={this.state.passwordCheck}
                                    onInput={evt => this.setState({passwordCheck: evt.target.value})}/>
                            </div>
                            {
                            this.state.passError ?
                                <div className="alert alert-danger">
                                    {this.state.passError}
                                </div> :
                                undefined
                            } 
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary">Sign Up</button>
                            </div>
                        </form>
                        <p>Already have an account? <Link to ={ROUTES.signIn}> Sign In! </Link> </p>
                    </div>
                </main>
            </div>
        );
    }
}