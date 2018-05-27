import React from "react";
import { Link } from "react-router-dom";
import constants from "./Constants";
import firebase from "firebase/app";
import "firebase/auth";
import md5 from "blueimp-md5";

import NameList from "./NameList";
import TaskList from "./TaskList";
import NewUserForm from "./NewUserForm";
import Header from "./Header";


export default class View extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: undefined,
            channel: "roommates",
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
                let hash = md5(currentUser.email);
                this.setState({userHash: hash})
                // console.log(this.state.user.uid); 

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
            ref = firebase.database().ref(this.state.userHash + "/" + this.props.match.params.tabName + "/names/");
            // console.log(this.state.user.uid);
            console.log(this.state.userHash);
        } else {
            ref = firebase.database().ref(this.state.userHash + "/" + this.props.match.params.tabName + `/taskList/`);
        }

        return (
            <div>
                {/* <header className="">
                    <div className="container-fluid">
                        <div className="row justify-content-between">
                            <div className="col-1 align-self-center">
                                <button className="btn btn-outline-danger btn-sm" onClick={this.handleSignOut}>
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>
                </header> */}
                <header id="logoBox" className="row m-0">
                    <div className="col">
                        <div id='logo' className="">
                            <div id='logoInner'>
                                <div id='logoInnerInner'></div>
                            </div>
                        </div>
                    </div>
                    <div className="col d-flex justify-content-end align-items-center">
                        <div id="signOut" className="">
                            <button className="btn btn-outline-danger btn-sm" onClick={this.handleSignOut}>
                                Sign Out
                            </button>
                        </div>
                    </div> 
                </header>
                <div className="container containerView">
                    {/* <div id = "tabContainer">
                        <div id="inactiveTab">
                            <div id="hacking"></div>
                            <div id="innerInactive"></div>
                            <div id="tabOverlay"></div>
                        </div>
                        <div id="activeTabBox">
                            <div id="activeTab">
                                <div id="innerActive"></div>
                            </div>
                            <div id="activeTabSlogan">
                                <p className="tabSlogan">.................</p>
                                <p className="tabSlogan" id="smaller">.............</p>
                            </div>
                        </div>
                    </div> */}
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
            
                        <main>
                        {this.props.match.params.tabName == 'roommates'?
                            <NameList roommatesRef={firebase.database().ref(this.state.userHash + "/" + this.props.match.params.tabName + "/names/")}/>
                            :
                            <TaskList taskRef={firebase.database().ref(this.state.userHash + "/" + this.props.match.params.tabName + `/taskList/`)}
                                    hash={this.state.userHash}/>
                        }
                            {/* <NewUserForm roommatesRef={this.state.roommatesRef}/> */}

                        </main>
                    </div>
            </div>
        )
    }
}