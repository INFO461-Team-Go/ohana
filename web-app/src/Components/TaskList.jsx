import React from "react";
import TaskCard from "./TaskCard";
import firebase from "firebase/app";
import Picker from 'react-picker'
import md5 from "blueimp-md5";


let listStyles = {
    maxWidth: "75%",
    width: "500px"
};
let greyButton = {
    color: "#8B8B8B",
    cursor: "default"
}

let greyButtonActive = {
    color: "#31c4f3",
    cursor: "pointer"
}

let redButton = {
    color: "#FF4D4D",
    cursor: "pointer"
}

export default class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            fbError: undefined,
            taskSnap: undefined,
            dataSource: [],
            recieved: false,
            roommate: 0,
            addActive: false
        };
    }


    async get_firebase_list() {
        return firebase.database().ref(this.props.hash + '/roommates/names/').once('value').then(function (snapshot) {
            var items = [];
            snapshot.forEach(function (childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                items.push(childData);
            });
            // console.log("items_load: " + items);
            return items;
        });
    }

    async componentWillMount() {
        this.setState({
            dataSource: await this.get_firebase_list(),
            recieved: true
        })
        console.log("items: " + this.state.dataSource);
    }

    async componentWillReceiveProps(nextProps) {
        this.props.taskRef.off("value", this.unlisten);
        this.unlisten = nextProps.taskRef.on("value", snapshot => this.setState({
            taskSnap: snapshot
        }));
    }

    componentDidMount() {
        this.unlisten = this.props.taskRef.on('value',
            snapshot => this.setState({ taskSnap: snapshot }));
    }

    componentWillUnmount() {
        this.props.taskRef.off('value', this.unlisten);
    }

    handleSubmit(evt) {
        //prevent the browser's default behavior
        //so that it doesn't try to post the form data
        //back to the server
        evt.preventDefault();

        this.props.taskRef.push({ name: this.state.name, roommate: this.state.roommate })
            .then(() => this.setState({ name: "", fbError: undefined }))
            .catch(err => this.setState({ fbError: err }));
    }

    onKeyPress(event) {
        if (event.which === 13 /* Enter */) {
            event.preventDefault();
        }
    }

    handleCancelAdd() {
        this.setState({ addActive: false });
    }

    render() {

        if (!this.state.taskSnap) {
            return <p>loading...</p>
        }
        //TODO: loop over the tasks snapshot
        //and create a <Task/> for each child snapshot
        //pushing it into an array
        let names = [];
        let rooms = [];
        let roommatenames = [];

        let poo = this.props;

        // console.log(this.state.dataSource)
        // this.state.dataSource.forEach(elem => {
        //     rooms.push(<Picker.Item label={elem.value}/>)
        // });

        function toTitleCase(str) {
            return str.replace(/\w\S*/g, function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        }

        let index = 0;

        this.state.dataSource.forEach(element => {
            console.log(element.name);
            roommatenames.push(element.name);
            rooms.push(<option value={index}>{toTitleCase(element.name)}</option>)
            index++;
            // rooms.push(<Picker.Item label={element.name} value={element.name} />);
        });

        this.state.taskSnap.forEach(nameSnap => {
            names.push(<TaskCard rooms={rooms} nameList={roommatenames} key={nameSnap.key} nameSnap={nameSnap} taskSnap={this.state.taskSnap} />)
        });
        console.log(names.length);

        console.log(this.state.dataSource)


        return (
            <div className="container" id="nameList" ref="wrap" style={listStyles}>
                {names}
                {
                    this.state.addActive ?
                        <div className="container p-0" id="roommateBox">
                            <form onKeyPress={this.onKeyPress} id="taskForm" className="d-flex row mx-auto" onSubmit={evt => { this.handleSubmit(evt); evt.preventDefault(); }}>
                                {
                                    this.state.fbError ?
                                        <div className="alert alert-danger">{this.state.fbError.message}</div> :
                                        undefined
                                }
                                <div className="row mx-0 w-100 px-1">
                                    <input type="text"
                                        className="form-control form-control-sm mx-auto col-8"
                                        id="inputBox"
                                        value={this.state.name}
                                        onInput={evt => this.setState({ name: evt.target.value })}
                                        placeholder="new task here"
                                    />
                                    <select className="col-4" id="inputBox" value={this.state.roommate} onChange={evt => this.setState({ roommate: Number(evt.target.value) })}>
                                        {rooms.length == 0 ?
                                            <option disabled selected value> Please Submit a Roommmate to Begin </option> :
                                            rooms
                                        }
                                    </select>
                                </div>
                                {/* {rooms.length == 0 || this.state.name.trim() == "" ?
                                    <input type="submit" value="Submit" className="btn btn-primary" disabled /> :
                                    <input type="submit" value="Submit" className="btn btn-primary" />
                                } */}
                                <div className="row mx-auto px-1">
                                    <h4 className="col text-center m-1" id="newCardButton" style={redButton}
                                        onClick={() => this.handleCancelAdd()}>cancel</h4>
                                    {
                                        rooms.length != 0 && this.state.name.trim() != "" ?
                                            <h4 className="col text-center m-1" id="newCardButton" style={greyButtonActive}
                                                onClick={(evt) => this.handleSubmit(evt)}>add</h4>
                                            :
                                            <h4 className="col text-center m-1" id="newCardButton" style={greyButton}>add</h4>
                                    }
                                </div>
                            </form>
                            {
                                this.state.errMsg ?
                                    <p className="text-danger">
                                        {this.state.errMsg}
                                    </p> :
                                    <div></div>
                            }
                        </div>
                        :
                        <div className="container d-flex justify-content-center my-3">
                            <i className="material-icons" id="addIcon"
                                onClick={() => this.setState({ addActive: true })}> add_circle_outline</i>
                        </div>
                }
                <div ref="listEnd"></div>
            </div>
        );
    }
}