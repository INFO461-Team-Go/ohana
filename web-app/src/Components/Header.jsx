import React from "react";

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header id="logoBox" className="">
                    <div id='logo'></div>
            </header>
        )
    }
}