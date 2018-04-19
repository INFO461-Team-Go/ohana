import React from "react";
import { Link } from "react-router-dom";

export default class SignUp extends React.Component {

    componentDidMount() {
        console.log("signup view did mount");
    }

    render() {
        return (
            <div className="container">
                <p>This is the sign up view</p>
                <button className="btn btn-primary">Sign Up</button>
            </div>
        )
    }
}