import React from "react";
import moment from "moment";

let baseStyles = {
    maxHeight: "35px" ,
    maxWidth: "35px", 
    borderRadius: "20%"
};

let state = {
    edit: false
};

export default class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false
        }
    }

    handleDelete() {
        this.props.messageSnap.ref.remove();
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
            let ref = this.props.messageSnap.ref;
            ref.update({body: this.state.toUpdate});
            this.setState({toUpdate: undefined});
        } 
        this.setState({edit: false});
    }   
    
    render() {
        //TODO: get the task properties and render accordingly;
        //use `doneStyles` if the task's .done property is truthy,
        //else use `baseStyles
        let message = this.props.messageSnap.val();
        let ref = this.props.messageSnap.ref;
        let date = moment(message.createdAt)
        return (
            <div className="card">
                <div className="row my-1 mx-3">
                    <div className="col-1 my-3 mx-2">
                        <div className="d-flex align-items-center flex-column">
                            <img className="mt-1 " src={message.author.photoURL} style={baseStyles} alt="profile"/>
                            <h6 className="my-3 text-nowrap">{message.author.displayName}</h6>
                        </div>
                    </div>
                    <div className="col my-3 mx-3">
                        <div className="card-block">
                            {/* <h6 className="card-title">{message.author.displayName}</h6> */}
                            {
                                !this.state.edit ?
                                <div id="content">
                                    <p className="card-text">{message.body}</p>
                                    <p className="card-text text-muted" id="dateAndTime">{date.format("MMMM Do YYYY, h:mm a")}</p>
                                    <div id="buttons">
                                        {
                                            this.props.user.uid === message.author.uid ?
                                            <button type="button" className="btn btn-outline-primary btn-sm mt-1 mr-2" onClick={() => this.handleEdit()}>Edit</button> :
                                            undefined
                                        }
                                        {
                                            this.props.user.uid === message.author.uid ?
                                            <button type="button" className="btn btn-danger btn-sm mt-1" onClick={() => this.handleDelete()}>Delete</button> :
                                            undefined
                                        }
                                    </div> 
                                </div> :
                                <form onSubmit={evt => this.handleSubmit(evt)}>
                                    <textarea className="form-control" type="text" defaultValue={message.body} rows="5" onChange={evt => this.setState({toUpdate: evt.target.value})}/>
                                    {   
                                        this.state.toUpdate ?
                                        <button type="submit" className="btn btn-outline-primary btn-sm mt-3 mr-2">Submit</button>:
                                        <button type="button" className="btn btn-outline-primary btn-sm mt-3 mr-2 disabled">Submit</button>

                                    }
                                    <button type="button" className="btn btn-danger btn-sm mt-3" onClick={() => this.handleCancel()}>Cancel</button>           
                                </form>
                            }
                        </div> 
                    </div>
                </div>
            </div>
        );
    }
}