import React from "react";
import { Link } from "react-router-dom";
import constants from "./Constants";


export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log("home page did mount");
    }

    componentWillUnmount() {
        console.log("home page will unmount");
    }

    render() {
        return (
            <div className="container">
                <h2 className="slogan">Welcome to <span className="thicker">o'hana!</span></h2>
                <h2 className="slogan subSlogan">a reimagined chore manager</h2>
                <h2 className="slogan subSlogan" id="threeSteps">with <span className="thicker" id="three">3</span> simple steps</h2>
                <div id="flex-container">
                    <div className="steps">
                        <div className="imageWrapper" id="user">
                            <div>
                                <div className="blocker"></div>
                                <div className="graphic" id="userGraphic"></div>
                            </div>
                            <div className="mobileOnly">
                                add name of users in order which they will perform a task
                                <div className="note">*note: special characters and numbers are not allowed</div>
                            </div>
                        </div>
                    </div>
                    <div className="steps">
                        <div className="imageWrapper" id="task">
                            <div>
                                <div className="blocker"></div>
                                <div className="graphic" id="taskGraphic"></div>
                            </div>
                            <div className="mobileOnly">
                                add name of tasks and assign a user who will start the order
                                <div className="note">*note: special characters and numbers are not allowed</div>
                            </div>
                        </div>
                    </div>
                    <div className="steps">
                        <div className="imageWrapper" id="alexa">
                            <div>
                                <div className="blocker"></div>
                                <div className="graphic" id="alexaGraphic"></div>
                            </div>
                            <div className="mobileOnly">
                                ask alexa to tell you who's turn it is or to mark your task done
                                <div className="note">for possible commands click here</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container text-center py-3" id="startNow">
                    <h5>Let's get started!: <Link to ={constants.routes.signin} className="text-white">sign in</Link></h5>
                </div>
            </div>
        );
    }
}