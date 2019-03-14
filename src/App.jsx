import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props)
    
    this.state = 
    {
      currentUser: {name: "Bob"},
      color: {'background-color': 'red'},
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
      // id: (this.state.messages.length + 1),
      username: this.state.currentUser.name,
      content: message,
      time: this.state.time

    }
    this.socket.send(JSON.stringify(newMessage));
    // this.setState({ messages: [...this.state.messages, newMessage] });
  }

  changeName = (name) => {
    console.log('name:', name);

    this.setState({ currentUser: {name: name} });

    console.log(this.state.currentUser.name);
  }

componentDidMount() {
  console.log("componentDidMount <App />");

    // Create WebSocket connection.
  this.socket = new WebSocket('ws://localhost:3001');

  // Connection opened
  this.socket.addEventListener('open', (event) => {
      // this.socket.send('Hello Server!');
      console.log('connection made')

  });

  // Listen for messages
  this.socket.addEventListener('message', (event) => {
      console.log('Message from server ', event.data);
      this.setState({ messages: [...this.state.messages, JSON.parse(event.data)] });
});
    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    //   const messages = this.state.messages.concat(newMessage)
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({messages: messages})
    // }, 3000);
  }

  render() {
    return (
      <div>
        <MessageList messages={ this.state.messages } color={ this.state.color }/>
        <ChatBar currentUser={ this.state.currentUser }  addMessage={ this.addMessage } changeName={ this.changeName }/>
      </div>
    );
  }
}
export default App;
