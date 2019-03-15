import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {
  constructor(props) {
    super(props)
    
    this.state = 
    {
      currentUser: "Bob",
      userCount: 0,
      emojiShown: false,
      messages: []
    }
  }
  
  addMessage = (message) => {

    const newMessage = {
      type: 'postMessage',
      username: this.state.currentUser,
      content: message
    }
    this.socket.send(JSON.stringify(newMessage));
  }

  changeName = (name) => {

    const newNotification = {
      type: 'postNotification',
      username: name,
      content: `${this.state.currentUser} has change their name to ${name}.`
    }
      this.setState({ currentUser: name } );
    
    this.socket.send(JSON.stringify(newNotification));
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

componentDidMount() {
  console.log("componentDidMount <App />");
  console.log('userCount: ', this.state.userCount);

    // Create WebSocket connection.
  this.socket = new WebSocket('ws://0.0.0.0:3001');

  // Connection opened
  this.socket.addEventListener('open', (event) => {
      // this.socket.send('Hello Server!');
      console.log('connection made');
      this.setState({userCount: this.state.userCount + 1});
      console.log('userCount: ', this.state.userCount);

  });

  // Listen for messages
  this.socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data)

    if (message.type === 'userCount') {
      this.setState({userCount: message.count})

    } else if (message.type === 'incomingImage') {
      this.setState({ messages: [...this.state.messages, message] }); 

    } else {
    
      console.log('Message from server ', event.data);
      this.setState({ messages: [...this.state.messages, message] });
    }  
  });
}

componentDidUpdate() {
  this.scrollToBottom();
}

  render() {
    return (
      <div>

        <NavBar userCount={ this.state.userCount }/>
        <MessageList messages={ this.state.messages } color={this.state.color}/>
          <div style={{ float:"left", clear: "both" }}
              ref={(el) => { this.messagesEnd = el; }}>
          </div>
        <ChatBar currentUser={ this.state.currentUser }  addMessage={ this.addMessage } changeName={ this.changeName } emojiShown={ this.state.emojiShown }/>
        
      </div>
    );
  }
}
export default App;
