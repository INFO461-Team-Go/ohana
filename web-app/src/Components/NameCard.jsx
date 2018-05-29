import React from "react";

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


export default class NameCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            menu: false
        }
    }
    
    handleDelete() {
        let toRemove = this.props.nameSnap;
        toRemove.ref.remove()
            .then(() => console.log("remove succeeded"));
            // .then(() => console.log("remove succeeded"))
            // .then(() => {
            //     let indexCount = 0;
            //     toRemove.ref.parent.once()
            // });
        // let snap= this.props.countSnap.val();
        // console.log("number = " + number);
        // this.props.countRef.set({count: number});
 
    }

    handleEdit() {
        if (!this.state.edit) {
            this.setState({edit: true});
        } else {
            this.setState({edit: false});
        }
    }

    handleCancel() {
        this.setState({toUpdate: undefined})
        this.setState({edit: false});
    }

    handleSubmit(evt) {
        evt.preventDefault();
        this.setState({errMsg: undefined});
        let trimmedName = this.state.toUpdate.trim();
        if (trimmedName.length > 15) {
            this.setState({errMsg: "name must be less than 15 characters"});
        } else if (!/^[a-zA-Z]+$/.test(trimmedName)) {
            this.setState({errMsg: "no special characters allowed"});
        } else {
            let ref = this.props.nameSnap.ref;
            ref.update({name: this.state.toUpdate});
            this.setState({toUpdate: undefined});
            this.setState({edit: false});
            this.setState({menu: false});
        } 
        // this.setState({edit: false});
        // this.setState({menu: false});
    }   

    handleMenu() {
        if (this.state.menu) {
            this.setState({menu: false});
        } else {
            this.setState({menu: true});
        }
    }

    handleCancelAdd() {
        this.setState({addActive: false});
    }

    
    render() {
        function toTitleCase(str) {
            return str.replace(/\w\S*/g, function(txt){
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        }

        let roommate = this.props.nameSnap.val();
        let ref = this.props.nameSnap.ref;
        return (   
            <div className="">
                {
                    !this.state.edit ?
                    // <div className="row">
                    //     <div className="cardBox my-2 row">
                    //         <div className="col-2"/>
                    //         <h4 className="m-0 col-8 text-truncate" id="cardFont">{toTitleCase(roommate.name)}</h4>
                    //         <i className="material-icons col-2" id="moreIcon">more_vert</i>
                    //     </div>
                    //     <div className="col-2">
                    //         <div className="buttons d-flex flex-column">
                    //             <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => this.handleEdit()}>Edit</button>
                    //             <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => this.handleDelete()}>Delete</button>
                    //         </div>
                    //     </div>
                    // </div> 
                    <div className="container" id="nameCard">  
                        <div className="cardBox my-2 row">
                            {/*<div className="col-2"/>*/}
                            <div className="nameSize">
                                <h4  id="cardFont">{toTitleCase(roommate.name)}</h4>
                            </div>
                            <i className="material-icons col-1" id="moreIcon" onClick={() => this.handleMenu()}>
                            more_vert</i>
                            {
                                this.state.menu ?
                                <div className="overlayBox container d-flex align-items-center row p-0">
                                    {/* <div className="row py-0"> */}
                                        <div className="col-2 p-0"></div>
                                        <div className="col-8 d-flex align-items-center justify-content-center p-0">
                                            <i className="material-icons m-auto" id="editIcon" onClick={() => this.handleEdit()}>edit</i>
                                            <i className="material-icons m-auto" id="deleteIcon" onClick={() => this.handleDelete()}>delete </i>
                                        </div>
                                        <div className="col-2 d-flex align-items-center justify-content-end p-0">
                                            <i className="material-icons mr-1" id="closeIcon" onClick={() => this.handleMenu()}>
                                            close</i>
                                        </div>
                                    {/* </div> */}
                                </div> :
                                <div></div>
                            }
                        </div> 
                    </div> :
                    <div className="container">
                        <form id="formBox" className="mx-auto" onSubmit={evt => this.handleSubmit(evt)}>
                            {
                                this.state.fbError ? 
                                <div className="alert alert-danger">{this.state.fbError.message}</div> : 
                                undefined
                            }
                            <input type="text" 
                                className="form-control form-control-sm mx-auto"
                                id="inputBox"
                                value={this.state.name}
                                onChange={evt => this.setState({toUpdate: evt.target.value})}
                                defaultValue={roommate.name}
                            />
                            <div className="row mx-auto px-1">
                                <h4 className="col text-center m-1" id="newCardButton" style={redButton}
                                onClick={() => this.handleEdit()}>cancel</h4>
                                {
                                    this.state.toUpdate ?
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
                    // <div className="">
                    //     <form className="d-flex" onSubmit={evt => this.handleSubmit(evt)}>
                    //         <div className="card my-3">
                    //             <div className="card-body py-0">
                    //                 <input className="form-control" type="text" defaultValue={roommate.name} onChange={evt => this.setState({toUpdate: evt.target.value})}/>
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
                }
            </div>
        );
    }
}