import React from "react";

import constants from "./Constants";
import firebase from "firebase/app";
import "firebase/auth";

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: undefined
        }
    }

    componentDidMount() {
        this.unlistenAuth = firebase.auth().onAuthStateChanged(currentUser => {
            if (currentUser == null) {
                console.log("current user is NULL");
                // this.props.history.push(constants.routes.home);
            } else {
                this.setState({ user: currentUser });
                // console.log(this.state.user.uid); 
            }
        });
    }

    handleSignOut() {
        console.log("user signing off!")
        firebase.auth().signOut();
    }

    render() {
        return (
            <header id="logoBox" className="row m-0">
                <div className="col">
                    <div id='logo' className="">
                        <div id='logoInner'>
                            <div id='logoInnerInner'></div>
                        </div>
                    </div>
                </div>
                {/* <div className="col d-flex justify-content-end align-items-center">
                    <div id="signOut" className="">
                        <button className="btn btn-outline-danger btn-sm" onClick={this.handleSignOut}>
                            Sign Out
                        </button>
                    </div>
                </div>  */}
            </header>
        )
    }
}