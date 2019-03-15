import React, {Component} from 'react';
// import EmojiPicker from 'emoji-picker-react';
// import 'emoji-picker-react/dist/universal/style.scss';

class ChatBar extends Component {
  constructor(props) {
    super(props)
  
    console.log('ChatBar props:', props)
  }
 
  newMessage = (event) => {
    if(event.keyCode == 13) {
        const messageInput = event.target.value;
        this.props.addMessage(messageInput);
        event.target.value = "";
      }
    }     

  newName = (event) => {    
      
    if(event.keyCode == 13) {
      const nameInput = event.target.value;
      if (nameInput !== this.props.currentUser) {
        this.props.changeName(nameInput);
      }
    }
  }  

    // emoji = (event, emoji) => {
    //   console.log(emoji)
    // }

  render() { 
    return (
      <footer className="chatbar">
          <input className="chatbar-username" defaultValue={ this.props.currentUser } onKeyDown={ this.newName }/>
          <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyDown={ this.newMessage }/>
          {/* <EmojiPicker onEmojiClick={ this.emoji }/> */}
      </footer>
    );
  }
}

export default ChatBar;




