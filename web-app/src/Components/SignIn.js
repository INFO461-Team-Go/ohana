import React from "react";
import { Link } from "react-router-dom";

export default class SignIn extends React.Component {
    render() {
        return (
            <div className="container">
                <p>This is the sign in view</p>
                <button className="btn btn-primary">Sign in</button>
            </div>
        )
    }
}