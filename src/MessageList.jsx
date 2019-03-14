import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
    constructor(props) {
        super(props)

        // console.log('props:', props);
    }

  render() {
    const messageItems = this.props.messages.map((message) => {
        return <Message key={message.id} username={message.username} 
                        content={message.content} time={message.time}
        />
    });
    return (
        <div>
            { messageItems }
        </div>
    );  
  }
}

export default MessageList;







