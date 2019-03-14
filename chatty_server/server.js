

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv1 = require ('uuid/v1');
const moment = require ('moment-timezone');

// Set the port to 3002
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

let id = 0;

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback
wss.on('connection', (ws) => {
  console.log('Clients connected:', wss.clients.size);
  ws.id = id++;
  console.log('ws id: ', ws.id);
  ws.color = ('#' + parseInt(Math.random() * 0xffffff).toString(16));
  console.log('ws color: ', ws.color);
  wss.clients.forEach(function each(client) {
  const message = {
      type: 'incomingNotification',
      content: 'A new "Chatter" has joined!'
    }
    if (client !== ws) {
    client.send(
        JSON.stringify(message)
    );
    }
    });

  wss.clients.forEach(function each(client) {
    // if (client.readyState === WebSocket.OPEN) {
      const message = {
          type: 'userCount',
          count: wss.clients.size
      }
    client.send(
      JSON.stringify(message)
    );
    // }
  });

  ws.on('message', (message) => {

      message = JSON.parse(message)

    if (message.type === 'postMessage') {

      message.type = 'incomingMessage';
      message.color = ws.color;    
      message.id = uuidv1();
      message.time = moment().tz("America/New_York").format("MMMM Do @ h:mm a");
      

      console.log(`User ${message.username} says '${message.content}'`);
      console.log(message);

      wss.clients.forEach(function each(client) {
        client.send(
          JSON.stringify(message)
        );
      });
    } else if (message.type === 'postNotification') {
         
      message.type = 'incomingNotification';  
    //   message.id = uuidv1();
    //   message.time = moment().tz("America/New_York").format("MMMM Do @ h:mm a");

      console.log(`User ${message.username} says '${message.content}'`);
      console.log(message);

      wss.clients.forEach(function each(client) {
        client.send(
          JSON.stringify(message)
        );
      });
    }
  });
    

    
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {console.log('Clients connected:', wss.clients.size);
    });
});

