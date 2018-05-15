import React from "react";
import { Link } from "react-router-dom";
import constants from "./Constants";
import firebase from "firebase/app";
import "firebase/auth";

import NameList from "./NameList";
import NewUserForm from "./NewUserForm";
import Header from "./Header";

export default class View extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: undefined,
            roommatesSnap: undefined,
            roommatesRef: undefined,
            countSnap: undefined,
            countRef: undefined
        }
    }
    
    componentDidMount() {
        console.log("main view mounted!");
        // let currentUser = firebase.auth().currentUser;
        this.unlistenAuth = firebase.auth().onAuthStateChanged(currentUser => {
            if (currentUser == null) {
                console.log("current user is NULL");
                this.props.history.push(constants.routes.home);
            } else {
                this.setState({user: currentUser});
                console.log("currentUser is " + this.state.user.email);
                let count = firebase.database().ref(`/roommates`);
                let ref = firebase.database().ref(`/roommates/names`);
                this.countListener = count.on("value", snapshot => this.setState({countSnap: snapshot}));
                this.valueListener = ref.on("value", snapshot => this.setState({roommatesSnap: snapshot}));
                this.setState({roommatesRef: ref});
                this.setState({countRef: count});
                
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
                    
                </header>
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
                <Header/>
                <main>
                    <NameList roommatesSnap={this.state.roommatesSnap} roommatesRef={this.state.roommatesRef} countSnap={this.state.countSnap} countRef={this.state.countRef}/>
                    {/* <NewUserForm roommatesRef={this.state.roommatesRef}/> */}
                </main>
            </div>
        )
    }
}