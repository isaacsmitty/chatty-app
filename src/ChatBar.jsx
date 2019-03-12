import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props)

    console.log('props:', props)
  }
  // onKeyDown = () => {
    
  // } 

  newMessage = (event) => {
    if(event.keyCode == 13) {
      console.log('value', event.target.value);
        // event.preventDefault();
        const messageInput = event.target.value;
  
        this.props.addMessage(messageInput);
  
        event.target.value = "";
      }
    }      

  render() {
    return (
      <footer className="chatbar">
        
          <input className="chatbar-username" placeholder={ this.props.currentUser.name } />

         
          <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyDown={ this.newMessage }/>
        
      </footer>
    );
  }
}

export default ChatBar;




