import React from "react";
import NameCard from "./NameCard";
import firebase from "firebase/app";


let listStyles = {
    maxWidth:"50%"
};

export default class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            fbError: undefined,
            roommatesSnap: undefined    
        };
    }

    componentWillReceiveProps(nextProps) {
        this.props.taskRef.off("value", this.unlisten);
        this.unlisten = nextProps.taskRef.on("value", snapshot => this.setState({
            roommatesSnap: snapshot
        }));
    }

    componentDidMount() {
        this.unlisten = this.props.taskRef.on('value',
            snapshot => this.setState({roommatesSnap: snapshot}));
    }

    componentWillUnmount() {
        this.props.taskRef.off('value', this.unlisten);
    }

    handleSubmit(evt) {
        //prevent the browser's default behavior
        //so that it doesn't try to post the form data
        //back to the server
        evt.preventDefault();

        this.props.taskRef.push({name: this.state.name})
            .then(() => this.setState({name: "", fbError: undefined}))
            .catch(err => this.setState({fbError: err}));
    }

    onKeyPress(event) {
        if (event.which === 13 /* Enter */) {
          event.preventDefault();
        }
    }

    render() {

        if (!this.state.roommatesSnap) {
            return <p>loading...</p>
        }
        //TODO: loop over the tasks snapshot
        //and create a <Task/> for each child snapshot
        //pushing it into an array
        let names = [];
        this.state.roommatesSnap.forEach(nameSnap => {
            names.push(<NameCard key={nameSnap.key} nameSnap={nameSnap} roommatesSnap={this.state.roommatesSnap}/>)
        });
        console.log(names.length);

        return (
            <div className="container" id="nameList" ref="wrap" style={listStyles}>
                {names}
                <form onKeyPress={this.onKeyPress} onSubmit={evt => {this.handleSubmit(evt); evt.preventDefault();}}>
                    {
                        this.state.fbError ? 
                        <div className="alert alert-danger">{this.state.fbError.message}</div> : 
                        undefined
                    }
                    <input type="text" 
                        className="form-control"
                        value={this.state.name}
                        onInput={evt => this.setState({name: evt.target.value})}
                        placeholder="new task here"
                    />
                    <input type="submit" value="Submit"/>
                </form>
                <div ref="listEnd"></div>
            </div>
        );
    }
}