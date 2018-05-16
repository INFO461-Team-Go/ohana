import React from "react";

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header id="logoBox" className="">
                    <div id='logo'><div id='logoInner'><div id='logoInnerInner'></div></div></div>
                    <h1 id="logoName">o'hana!</h1>
            </header>
        )
    }
}