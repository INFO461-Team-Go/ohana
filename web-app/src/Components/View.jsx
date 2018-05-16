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
            channel: "roommates"
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

    handleChange(chan) {
        this.props.history.push('/view/' + chan);
        this.setState({
            channel: chan
        });
    }

    render() {
        let ref;

        if(this.props.match.params.tabName == 'roommates'){
            ref = firebase.database().ref(this.props.match.params.tabName + "/names/");
        } else {
            ref = firebase.database().ref(this.props.match.params.tabName);
        }

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
                <div className="container">
                    <ul className="nav nav-tabs">
                        <li className = "nav-item">
                        <a 
                            className={this.props.match.params.tabName == 'roommates'?
                            "display-4 nav-link active":
                            "display-4 nav-link"}
                            onClick={() => this.handleChange('roommates')}
                            >Roommates</a>
                        </li>
                        <li className = "nav-item">
                        <a 
                            className={this.props.match.params.tabName == 'tasks'?
                            "display-4 nav-link active":
                            "display-4 nav-link"}
                            onClick={() => this.handleChange('tasks')}
                            >Tasks</a>
                        </li>
                    </ul>
                </div>
            
                <main>
                {this.props.match.params.tabName == 'roommates'?
                    <NameList roommatesRef={ref}/>
                    :
                    <div></div>
                    }
                    {/* <NewUserForm roommatesRef={this.state.roommatesRef}/> */}

                </main>
            </div>
        )
    }
}