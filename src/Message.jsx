
import React, {Component} from 'react';

class Message extends Component {
    constructor(props) {
        super(props)

    }

  render() {
    return (
        <main className="messages">
          { this.props.type === 'incomingMessage' &&
            <div className="message">
                <span className="message-username" style={ {color: this.props.color} }>{ this.props.username }</span>
                <span className="message-content" style={ {color: this.props.color} }>{ this.props.content } </span>
                <span className="message-time" >{ this.props.time}</span>
            </div> } 
          { this.props.type === 'incomingNotification' &&
            <div>
                <span className="message system">{this.props.content}</span>
            </div> }
          { this.props.type === 'incomingImage' &&
            <div className="message">
                <span className="message-username" style={ {color: this.props.color} }>{ this.props.username }</span>
                <img className="message-image" src ={this.props.content} />
                <span className="message-time" >{ this.props.time}</span>
            </div> }  
            
        </main>
    );  
  }
}

export default Message;
