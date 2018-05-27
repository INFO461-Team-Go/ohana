import React from "react";
import firebase from "firebase/app";


export default class TaskCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false        }
    }
    
    handleDelete() {
        this.props.nameSnap.ref.remove()
            .then(() => console.log("remove succeeded"))
        // let snap= this.props.countSnap.val();
        // console.log("number = " + number);
        // this.props.countRef.set({count: number});
    }

    handleEdit() {
        this.setState({edit: true});
    }

    handleCancel() {
        this.setState({toUpdate: undefined})
        this.setState({edit: false});
    }

    handleSubmit(evt) {
        evt.preventDefault();
        if (this.state.toUpdate != null) {
            let ref = this.props.nameSnap.ref;
            ref.update({name: this.state.toUpdate});
            this.setState({toUpdate: undefined});
        } 
        this.setState({edit: false});
    }  
    
    handleChange(evt) {
        evt.preventDefault();
        let ref = this.props.nameSnap.ref;
        ref.update({roommate: evt.target.value});
    }

    
    render() {
        function toTitleCase(str) {
            return str.replace(/\w\S*/g, function(txt){
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        }

        let task = this.props.nameSnap.val();

        let ref = this.props.nameSnap.ref;
        return (   
            <div>
                {
                    !this.state.edit ?
                    <div className="d-flex">
                        {/* <div className="card my-3">
                            <div className="card-body py-0">
                                <div id="content">
                                    <p className="card-text py-3">{toTitleCase(roommate.name)}</p>
                                </div>
                            </div>
                        </div> */}
                        <div className="cardBox my-2 row">
                            <div className="col-2"/>
                            <h4 className="m-0 col-8 text-truncate" id="cardFont">{toTitleCase(task.name)}</h4>
                            <i className="material-icons col-2" id="moreIcon">more_vert</i>
                            {/* <h4 className="text-center">{roommate.name}</h4> */}
                            </div>
                            <div className="cardBox my-2 row">
                            <select defaultValue={task.roommate} onChange={evt => this.handleChange}className="w-100 text-truncate" id="cardFont">{this.props.rooms}</select>
                            </div>
                        <div className="buttons d-flex flex-column">
                            <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => this.handleEdit()}>Edit</button>
                            <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => this.handleDelete()}>Delete</button>
                        </div>
                    </div> :
                    <div className="">
                        <form className="d-flex" onSubmit={evt => this.handleSubmit(evt)}>
                            <div className="card my-3">
                                <div className="card-body py-0">
                                    <input className="form-control" type="text" defaultValue={task.name} onChange={evt => this.setState({toUpdate: evt.target.value})}/>
                                </div>
                            </div>
                            <div className="buttons d-flex flex-column">
                                {   
                                    this.state.toUpdate ?
                                    <button type="submit" className="btn btn-outline-primary btn-sm">Submit</button>:
                                    <button type="button" className="btn btn-outline-primary btn-sm disabled">Submit</button>

                                }
                                <button type="button" className="btn btn-danger btn-sm" onClick={() => this.handleCancel()}>Cancel</button>
                            </div>

                        </form>
                    </div>
                }
            </div>
        );
    }
}