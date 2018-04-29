import React from "react";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";

export default class View extends React.Component {
    render() {
        return (
            <div className="container">
                This is the tab view
            </div>
        )
    }
}