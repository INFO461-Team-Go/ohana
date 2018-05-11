import React from "react";
import { Link } from "react-router-dom";
import constants from "./Constants";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="container">
                <h2 className="slogan">Welcome to <span className="thicker">o'hana!</span></h2>
                <h2 className="slogan subSlogan">a reimagined chore manager</h2>
                <h2 className="slogan subSlogan" id="threeSteps">with <span className="thicker" id="three">3</span> simple steps</h2>

                <div className="container d-md-flex ">
                    <div className="card mx-auto" style={{ width: 15 + 'em' }}>
                        <img className="card-img-top" src="..." alt="Card image cap" />
                        <div className="card-body">
                            <h5 className="card-title">Step 1</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                    <div className="card mx-auto" style={{ width: 15 + 'em' }}>
                        <img className="card-img-top" src="..." alt="Card image cap" />
                        <div className="card-body">
                            <h5 className="card-title">Step 2</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                    <div className="card mx-auto" style={{ width: 15 + 'em' }}>
                        <img className="card-img-top" src="..." alt="Card image cap" />
                        <div className="card-body">
                            <h5 className="card-title">Step 3</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}