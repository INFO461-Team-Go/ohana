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
            roommatesSnap: undefined    
        };
    }

    componentWillReceiveProps(nextProps) {
        this.props.roommatesRef.off("value", this.unlisten);
        this.unlisten = nextProps.roommatesRef.on("value", snapshot => this.setState({
            roommatesSnap: snapshot
        }));
    }

    componentDidMount() {
        this.unlisten = this.props.roommatesRef.on('value',
            snapshot => this.setState({roommatesSnap: snapshot}));
    }

    componentWillUnmount() {
        this.props.roommatesRef.off('value', this.unlisten);
    }

    handleSubmit(evt) {
        //prevent the browser's default behavior
        //so that it doesn't try to post the form data
        //back to the server
        evt.preventDefault();

        this.props.roommatesRef.push({name: this.state.name})
            .then(() => this.setState({name: "", fbError: undefined}))
            .catch(err => this.setState({fbError: err}));
    }

    render() {

        if (!this.state.roommatesSnap) {
            return <p>loading...</p>
        }
        let names = [];
        this.state.roommatesSnap.forEach(nameSnap => {
            names.push(<NameCard key={nameSnap.key} nameSnap={nameSnap} roommatesSnap={this.state.roommatesSnap}/>)
        });

        return (
            <div className="container" id="nameList" ref="wrap" style={listStyles}>
                {names}
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