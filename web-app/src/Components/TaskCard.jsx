import React from "react";
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


export default class TaskCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            menu: false,
            roommate: Number(this.props.nameSnap.val().roommate)
        }
    }

    handleDelete() {
        let toRemove = this.props.nameSnap;
        toRemove.ref.remove()
        // let snap= this.props.countSnap.val();
        // console.log("number = " + number);
        // this.props.countRef.set({count: number});
    }

    handleEdit() {
        if (!this.state.edit) {
            this.setState({ edit: true });
        } else {
            this.setState({ edit: false });
        }
    }

    handleCancel() {
        this.setState({ toUpdate: undefined })
        this.setState({ edit: false });
    }

    handleSubmit(evt) {
        evt.preventDefault();
        if (this.state.toUpdate != null) {
            let ref = this.props.nameSnap.ref;
            ref.update({ name: this.state.toUpdate, roommate: Number(this.state.roommate) });
            this.setState({ toUpdate: undefined, roommate: undefined });
        }
        this.setState({ edit: false });
        this.setState({ menu: false });
    }
    handleMenu() {
        if (this.state.menu) {
            this.setState({ menu: false });
        } else {
            this.setState({ menu: true });
        }
    }

    handleCancelAdd() {
        this.setState({ addActive: false });
    }

    handleChange(evt) {
        evt.preventDefault();
        let ref = this.props.nameSnap.ref;
        ref.update({ roommate: Number(evt.target.value) });
        this.setState({ toUpdate: undefined, roommate: undefined });
    }

    render() {
        function toTitleCase(str) {
            return str.replace(/\w\S*/g, function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        }
        console.log(this.state.roommate)

        let task = this.props.nameSnap.val();
        console.log("task.name: " + task.name + " task.roommate: " + task.roommate + " this.state.roommate: " + this.state.roommate + " this.props.rooms: " + this.props.rooms);
    

        let ref = this.props.nameSnap.ref;
        return (
            <div>
                {
                    !this.state.edit ?
                        <div className="d-flex row mx-0">
                            {/* <div className="card my-3">
                            <div className="card-body py-0">
                                <div id="content">
                                    <p className="card-text py-3">{toTitleCase(roommate.name)}</p>
                                </div>
                            </div>
                        </div> */}
                            <div className="p-0 cardBox my-2 row col-8">
                                <div className="p-0 col-1" />
                                <h4 className="p-0 m-0 col-10 text-truncate" id="cardFont">{toTitleCase(task.name)}</h4>
                                <i className="p-0 material-icons col-1" id="tMoreIcon" onClick={() => this.handleMenu()}>more_vert</i>
                                {
                                    this.state.menu ?
                                        <div className="overlayBox container d-flex align-items-center row p-0">
                                            {/* <div className="row py-0"> */}
                                            <div className="col-1 p-0"></div>
                                            <div className="col-10 d-flex align-items-center justify-content-center p-0">
                                                <i className="material-icons m-2" id="editIcon" onClick={() => this.handleEdit()}>edit</i>
                                                <i className="material-icons m-2" id="deleteIcon" onClick={() => this.handleDelete()}>delete </i>
                                            </div>
                                            <div className="col-1 d-flex align-items-center justify-content-end p-0">
                                                <i className="material-icons mr-1" id="closeIcon" onClick={() => this.handleMenu()}>
                                                    close</i>
                                            </div>
                                            {/* </div> */}
                                        </div> :
                                        <div></div>
                                }
                                {/* <h4 className="text-center">{roommate.name}</h4> */}
                            </div>
                            <div className="cardBox my-2 row col-4 p-0">
                                {console.log("check" + this.props.rooms[task.roommate])}
                                <select value={Number(task.roommate)} onChange={evt => this.handleChange(evt)} className="w-100 text-truncate border-0" id="cardFont">{this.props.rooms}</select>
                            </div>
                            {/* <div className="buttons d-flex flex-column">
                                <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => this.handleEdit()}>Edit</button>
                                <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => this.handleDelete()}>Delete</button>
                            </div> */}
                        </div> :
                        // <div className="">
                        //     <form className="d-flex" onSubmit={evt => this.handleSubmit(evt)}>
                        //         <div className="card my-3">
                        //             <div className="card-body py-0">
                        //                 <input className="form-control" type="text" defaultValue={task.name} onChange={evt => this.setState({toUpdate: evt.target.value})}/>
                        //             </div>
                        //         </div>
                        //         <div className="buttons d-flex flex-column">
                        //             {   
                        //                 this.state.toUpdate ?
                        //                 <button type="submit" className="btn btn-outline-primary btn-sm">Submit</button>:
                        //                 <button type="button" className="btn btn-outline-primary btn-sm disabled">Submit</button>

                        //             }
                        //             <button type="button" className="btn btn-danger btn-sm" onClick={() => this.handleCancel()}>Cancel</button>
                        //         </div>

                        //     </form>
                        // </div>
                        // <div className="d-flex row mx-0">
                        //     {/* <div className="card my-3">
                        //     <div className="card-body py-0">
                        //         <div id="content">
                        //             <p className="card-text py-3">{toTitleCase(roommate.name)}</p>
                        //         </div>
                        //     </div>
                        // </div> */}
                        //     <div className="p-0 cardBox my-2 row col-8">
                        //         <div className="p-0 col-1" />
                        //         <input className="form-control" type="text" defaultValue={task.name} onChange={evt => this.setState({ toUpdate: evt.target.value })} />
                        //         <i className="px-0 material-icons col-1" id="tMoreIcon" onClick={() => this.handleMenu()}>more_vert</i>
                        //         {
                        //             this.state.menu ?
                        //                 <div className="overlayBox container d-flex align-items-center row p-0">
                        //                     {/* <div className="row py-0"> */}
                        //                     <div className="col-1 p-0"></div>
                        //                     <div className="col-10 d-flex align-items-center justify-content-center p-0">
                        //                         <i className="material-icons m-2" id="editIcon" onClick={() => this.handleEdit()}>edit</i>
                        //                         <i className="material-icons m-2" id="deleteIcon" onClick={() => this.handleDelete()}>delete </i>
                        //                     </div>
                        //                     <div className="col-1 d-flex align-items-center justify-content-end p-0">
                        //                         <i className="material-icons mr-1" id="closeIcon" onClick={() => this.handleMenu()}>
                        //                             close</i>
                        //                     </div>
                        //                     {/* </div> */}
                        //                 </div> :
                        //                 <div></div>
                        //         }
                        //         {/* <h4 className="text-center">{roommate.name}</h4> */}
                        //     </div>
                        //     <div className="cardBox my-2 row col-4 p-0">
                        //         <select defaultValue={task.roommate} onChange={evt => this.handleChange} className="w-100 text-truncate border-0" id="cardFont">{this.props.rooms}</select>
                        //     </div>
                        //     {/* <div className="buttons d-flex flex-column">
                        //         <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => this.handleEdit()}>Edit</button>
                        //         <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => this.handleDelete()}>Delete</button>
                        //     </div> */}
                        // </div>
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
                                        onChange={evt => this.setState({ toUpdate: evt.target.value })}
                                        defaultValue={task.name}
                                    />
                                    <select className="col-4" id="inputBox" onChange={evt => this.setState({ roommate: Number(evt.target.value) })}>
                                        {this.props.rooms.length == 0 ?
                                            <option disabled selected value> Please Submit a Roommmate to Begin </option> :
                                            this.props.rooms
                                        }
                                    </select>
                                </div>
                                {/* {rooms.length == 0 || this.state.name.trim() == "" ?
                                    <input type="submit" value="Submit" className="btn btn-primary" disabled /> :
                                    <input type="submit" value="Submit" className="btn btn-primary" />
                                } */}
                                <div className="row mx-auto px-1">
                                    <h4 className="col text-center m-1" id="newCardButton" style={redButton}
                                        onClick={() => this.handleEdit()}>cancel</h4>

                                    <h4 className="col text-center m-1" id="newCardButton" style={greyButtonActive}
                                        onClick={(evt) => this.handleSubmit(evt)}>add</h4>
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
                }
            </div>
        );
    }
}