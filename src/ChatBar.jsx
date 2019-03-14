import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props)

    console.log('ChatBar props:', props)
  }
 

  newMessage = (event) => {
    if(event.keyCode == 13) {
      console.log('value', event.target.value);
        const messageInput = event.target.value;
        this.props.addMessage(messageInput);
        event.target.value = "";
      }
    }      

  newName = (event) => {    
      console.log('value', event.target.value);
        const nameInput = event.target.value;
        this.props.changeName(nameInput);
        // event.target.value = "";
      }
       

  render() { 
    return (
      <footer className="chatbar">
          <input className="chatbar-username" defaultValue={ this.props.currentUser } onBlur={ this.newName }/>
          <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyDown={ this.newMessage }/>
      </footer>
    );
  }
}

export default ChatBar;




