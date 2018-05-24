import React from "react";
import NameCard from "./NameCard";
import firebase from "firebase/app";
import Picker from 'react-picker'


let listStyles = {
    maxWidth:"50%"
};

export default class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            fbError: undefined,
            taskSnap: undefined,
            dataSource: []  
        };
    }

    /*async get_firebase_list(){
        return firebase.database().ref('/roommates/names/').once('value').then(function(snapshot) {
            var items = [];
            snapshot.forEach(function(childSnapshot) {
              var childKey = childSnapshot.key;
              var childData = childSnapshot.val();
              items.push(childData);
            }); 
            // console.log("items_load: " + items);
            return items;
        });
    }
    async componentWillMount(){
        this.setState({
            dataSource : await this.get_firebase_list()
        })
        console.log("items: " + this.state.dataSource);
    }*/

    componentWillReceiveProps(nextProps) {
        this.props.taskRef.off("value", this.unlisten);
        this.unlisten = nextProps.taskRef.on("value", snapshot => this.setState({
            taskSnap: snapshot
        }));
    }

    componentDidMount() {
        this.unlisten = this.props.taskRef.on('value',
            snapshot => this.setState({taskSnap: snapshot}));
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

        if (!this.state.taskSnap) {
            return <p>loading...</p>
        }
        //TODO: loop over the tasks snapshot
        //and create a <Task/> for each child snapshot
        //pushing it into an array
        let names = [];

        //let roommates = this.get_firebase_list();

        /*roommates.forEach(function(elem){
            console.log(elem)
        });*/

        this.state.taskSnap.forEach(nameSnap => {
            names.push(<NameCard key={nameSnap.key} nameSnap={nameSnap} taskSnap={this.state.taskSnap}/>)
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
                    <Picker />
                    <input type="submit" value="Submit"/>
                </form>
                <div ref="listEnd"></div>
            </div>
        );
    }
}