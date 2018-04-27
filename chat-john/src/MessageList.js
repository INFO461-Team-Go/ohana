import React from "react";
import Message from "./Message";

export default class MessageList extends React.Component {
    scrollToBottom = () => {
        this.refs.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
      
      
    componentDidUpdate() {
        if(this.props.channelSnap) {
            this.scrollToBottom();
        }
    }


    render() {

        if (!this.props.channelSnap) {
            return <p>loading...</p>
        }
        //TODO: loop over the tasks snapshot
        //and create a <Task/> for each child snapshot
        //pushing it into an array
        let messages = [];
        this.props.channelSnap.forEach(messageSnap => {
            messages.push(<Message key={messageSnap.key} messageSnap={messageSnap} user={this.props.user}/>)
        });

        return (
            <div className="container" id="messageList" ref="wrap">
                {messages}
                <div ref="messagesEnd"></div>
            </div>
        );
    }
}