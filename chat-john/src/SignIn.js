import React from "react";
import {Link} from "react-router-dom";
import {ROUTES} from "./constants";
import firebase from "firebase/app";
import "firebase/auth";

export default class SignInView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            displayName: ""
        }
    }

    componentDidMount() {
        console.log("sign-in view did mount");
        let currentUser = firebase.auth().currentUser;
        // if (currentUser != null) {
        //     this.props.history.push(ROUTES.generalChannel);
        // }
        this.unlistenAuth = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.history.push(ROUTES.generalChannel)
            } 
        });
    }
    componentWillUnmount() {
        this.unlistenAuth();
        console.log("signin view will unmount");
    }

    handleSubmit(evt) {
        evt.preventDefault();
        //do your authentication
        // if it was successful, then

        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .catch(err => this.setState({fberror: err}))

    }

    render() {
        return (
            <div>
                <header className="jumbotron jumbotron-fluid bg-primary text-white">
                    <div className="container">
                        <h1>Sign In</h1>
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
                                <label htmlFor="email">Email Address</label>
                                <input type="text"
                                    id="email"
                                    className="form-control"
                                    placeholder="your email address"
                                    value={this.state.email}
                                    onInput={evt => this.setState({email: evt.target.value})}/>
                            </div>
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
                                <button type="submit" className="btn btn-primary">Sign In</button>
                            </div>
                        </form>
                        <p>Don't have an account yet? <Link to ={ROUTES.signUp}> Sign Up! </Link></p>
                    </div>
                </main>
            </div>
        );
    }
}