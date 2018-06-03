import React from "react";
import NameCard from "./NameCard";
import firebase from "firebase/app";

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

export default class NameList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            fbError: undefined,
            roommatesSnap: undefined,
            addActive: false
        };
    }

    componentWillReceiveProps(nextProps) {
        this.props.roommatesRef.off("value", this.unlisten);
        this.props.taskRef.off('value', this.unlistenTask);
        this.unlisten = nextProps.roommatesRef.on("value", snapshot => {
            this.setState({roommatesSnap: snapshot});
            if (snapshot.numChildren() > 0) {
                this.setState({addActive: false});
            } else {
                this.setState({addActive: true});
            }
        });
        this.unlistenTask = nextProps.taskRef.on('value', snapshot => {
            this.setState({taskSnap: snapshot});
        })
    }

    componentDidMount() {
        this.unlisten = this.props.roommatesRef.on('value', snapshot => {
            this.setState({roommatesSnap: snapshot});
            if (snapshot.numChildren() > 0) {
                this.setState({addActive: false});
            } else {
                this.setState({addActive: true});
            }    
        });
        this.unlistenTask = this.props.taskRef.on('value', snapshot => {
            this.setState({taskSnap: snapshot});
        })
        console.log("name list did mount")
    }

    componentWillUnmount() {
        this.props.roommatesRef.off('value', this.unlisten);
        this.props.taskRef.off('value', this.unlistenTask);
        console.log("name list will unmount")
    }

    handleSubmit(evt) {
        //prevent the browser's default behavior
        //so that it doesn't try to post the form data
        //back to the server
        evt.preventDefault();
        this.setState({errMsg: undefined});
        let trimmedName = this.state.name.trim();
        let flag = 0;
        this.state.roommatesSnap.forEach(childSnap => {
            let val = childSnap.val();
            let check = val.name;
            if (check === trimmedName) {
                flag++;
            }
        });
        if (flag > 0) {
            this.setState({errMsg: "name exists in database"}) ;
        } else if (trimmedName.length > 15) {
            this.setState({errMsg: "name must be less than 15 characters"});
        } else if (!/^[a-zA-Z]+$/.test(trimmedName)) {
            this.setState({errMsg: "no special characters allowed"});
        } else {
            this.props.roommatesRef.push({name: trimmedName})
                .then(() => this.setState({name: "", fbError: undefined, addActive: false}))
                .catch(err => this.setState({fbError: err}));
        }
    }

   async checkDuplicate(snapshot, check) {
        let array = [];
        let message = "";
        let flag = 0;
        await snapshot.forEach(childSnap => {
            let val = childSnap.val();
            array.push(val.name);
            message = "";
            if (val.name === check) {
                flag++;
            }
        })
        console.log("flag: " + flag);
        return flag;
        
    }

    handleCancelAdd() {
        this.setState({addActive: false, errMsg: undefined});
    }

    render() {

        if (!this.state.roommatesSnap || !this.state.taskSnap) {
            return <p>loading...</p>
        } else {
            // updates index counter whenever list is rendered. 
            let snapshot = this.state.roommatesSnap;
            let indexCount = 0;
            snapshot.forEach(nameSnap => {
                nameSnap.ref.update({index: indexCount});
                indexCount++;
            });
            let parent = snapshot.ref.parent;
            let numChildren = snapshot.numChildren();
            parent.update({count: numChildren});
        }
        let names = [];
        this.state.roommatesSnap.forEach(nameSnap => {
            names.push(<NameCard key={nameSnap.key} nameSnap={nameSnap} roommatesSnap={this.state.roommatesSnap} taskSnap={this.state.taskSnap}/>)
        });

        return (
            <div className="container" id="nameList" ref="wrap">
                {names}
                {
                    this.state.addActive ?
                        <div className="container" id="roommateBox">
                            <form id="formBox" onSubmit={evt => this.handleSubmit(evt)}>
                                {
                                    this.state.fbError ? 
                                    <div className="alert alert-danger">{this.state.fbError.message}</div> : 
                                    undefined
                                }
                                <input type="text" 
                                    className="form-control form-control-sm mx-auto"
                                    id="inputBox"
                                    value={this.state.name}
                                    onInput={evt => this.setState({name: evt.target.value})}
                                    placeholder="new roommate here"
                                />
                                <div className="row mx-auto px-1">
                                    <h4 className="col text-center mx-auto newCardButton" style={redButton}
                                    onClick={() => this.handleCancelAdd()}>cancel</h4>
                                    {
                                        this.state.name ?
                                        <h4 className="col text-center mx-auto newCardButton" style={greyButtonActive}
                                        onClick={(evt) => this.handleSubmit(evt)}>add</h4>
                                        :
                                        <h4 className="col text-center mx-auto newCardButton" style={greyButton}>add</h4>
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
                            onClick={() => this.setState({addActive: true})}> add_circle_outline</i>
                        </div>
                }
                <div ref="listEnd"></div>
            </div>
        );
    }
}