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
      // color: {'backgroundColor': 'white'},
      messages: []
      //   {
      //     id: 1,
      //     username: "Bob",
      //     content: "Has anyone seen my marbles?",
      //   },
      //   {
      //     id: 2,
      //     username: "Anonymous",
      //     content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
      //   }
      // ]
    }
  }
  

  addMessage = (message) => {

    const newMessage = {
      type: 'postMessage',
      username: this.state.currentUser,
      content: message
    }
    this.socket.send(JSON.stringify(newMessage));
    // this.setState({ messages: [...this.state.messages, newMessage] });
  }

  changeName = (name) => {

    const newNotification = {
      type: 'postNotification',
      content: `${this.state.currentUser} has change their name to ${name}.`
    }
      this.setState({ currentUser: name } );
    
    this.socket.send(JSON.stringify(newNotification));
  }

componentDidMount() {
  console.log("componentDidMount <App />");
  console.log('userCount: ', this.state.userCount);

    // Create WebSocket connection.
  this.socket = new WebSocket('ws://localhost:3002');

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

    } else {
    
      console.log('Message from server ', event.data);
      this.setState({ messages: [...this.state.messages, message] });
    }
    
  });
  
}

  render() {
    return (
      <div>

        <NavBar userCount={ this.state.userCount }/>
        <MessageList messages={ this.state.messages } />
        <ChatBar currentUser={ this.state.currentUser }  addMessage={ this.addMessage } changeName={ this.changeName }/>
        
      </div>
    );
  }
}
export default App;
