import React from "react";
import { Link } from "react-router-dom";
import constants from "./Constants";
import firebase from "firebase/app";
import "firebase/auth";

export default class View extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: undefined
        }
    }
    
    componentDidMount() {
        console.log("main view mounted!");
        // let currentUser = firebase.auth().currentUser;
        this.unlistenAuth = firebase.auth().onAuthStateChanged(currentUser => {
            if (currentUser == null) {
                console.log("current user is NULL");
                this.props.history.push(constants.routes.signin);
            } else {
                this.setState({user: currentUser});
                console.log("currentUser is " + this.state.user.email);
            }
        });
    }

    componentWillUnmount() {
        this.unlistenAuth();
        console.log("main view will unmount");

    }

    handleSignOut() {
        console.log("user signing off!")
        firebase.auth().signOut();   
    }

    render() {
        return (
            <div>
                <header className="">
                    <div className="container-fluid">
                        <div className="row justify-content-between">
                            <div className="col my-2 align-self-center">
                                This is the tab view   
                            </div>
                            <div className="col-1 align-self-center">
                                <button className="btn btn-outline-danger btn-sm" onClick={this.handleSignOut}>
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        )
    }
}