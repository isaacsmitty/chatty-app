import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
    constructor(props) {
        super(props)
    }

  render() {
    // const { color, messages } = this.props;
    // // const  messageItems = this.props.messages.map((message) => {
    // //     return <Message key={message.id} username={message.username} 
    // //         content={message.content} time={message.time}
    // //         type={message.type} color={colour}
    // //     />
    // // });
    return (
        <div>
            {this.props.messages.map((message) => {
                return (
                <Message key={message.id} username={message.username} 
                    content={message.content} time={message.time}
                    type={message.type} color={message.color}
                />
                )
                })}
        </div>
    );  
  }
}

export default MessageList;
