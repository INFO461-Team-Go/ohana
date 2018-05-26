import React from "react";


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
                            <div className="col-2"/>
                            <div className="col-8">
                                <h4 claasName="m-0 col-8 text-truncate" id="cardFont">{toTitleCase(roommate.name)}</h4>
                            </div>
                            <i className="material-icons col-2" id="moreIcon">more_vert</i>
                        </div> 
                        {
                            !this.state.menu ?
                            <div className="overlayBox my-2">
                            </div> :
                            <div></div>
                        }
                    </div> :
                    <div className="">
                        <form className="d-flex" onSubmit={evt => this.handleSubmit(evt)}>
                            <div className="card my-3">
                                <div className="card-body py-0">
                                    <input className="form-control" type="text" defaultValue={roommate.name} onChange={evt => this.setState({toUpdate: evt.target.value})}/>
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