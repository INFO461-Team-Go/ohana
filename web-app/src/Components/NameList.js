import React from "react";
import NameCard from "./NameCard";
import firebase from "firebase/app";

let listStyles = {
    maxWidth:"50%"
};

export default class NameList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            fbError: undefined,
            count: undefined   
        };
    }

    handleSubmit(evt) {
        //prevent the browser's default behavior
        //so that it doesn't try to post the form data
        //back to the server
        evt.preventDefault();

        this.props.roommatesRef.push({name: this.state.name})
            .then(() => this.setState({name: "", fbError: undefined}))
            // .then(() => this.props.countRef.update({count: this.names.length}))
            .catch(err => this.setState({fbError: err}));
    }

    render() {

        if (!this.props.roommatesSnap) {
            return <p>loading...</p>
        }
        //TODO: loop over the tasks snapshot
        //and create a <Task/> for each child snapshot
        //pushing it into an array
        this.names = [];
        this.props.roommatesSnap.forEach(nameSnap => {
            this.names.push(<NameCard key={nameSnap.key} nameSnap={nameSnap} roommatesSnap={this.props.roommatesSnap} countSnap={this.props.countSnap} countRef={this.props.countRef}/>)
        });
        console.log(this.names.length);

        return (
            <div className="container" id="nameList" ref="wrap" style={listStyles}>
                {this.names}
                <form onSubmit={evt => this.handleSubmit(evt)}>
                    {
                        this.state.fbError ? 
                        <div className="alert alert-danger">{this.state.fbError.message}</div> : 
                        undefined
                    }
                    <input type="text" 
                        className="form-control"
                        value={this.state.name}
                        onInput={evt => this.setState({name: evt.target.value})}
                        placeholder="new roommate here"
                    />
                </form>
                <div ref="listEnd"></div>
            </div>
        );
    }
}