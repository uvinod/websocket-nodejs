const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8082 });

wss.on("connection", ws => {
  console.log("Handshake with client successfull");

  ws.on("message", data => {
    console.log(`Client has sent: ${data}`);

    loopWithDelay(function(i) { 
      
      ws.send(`Server message: ${i}, user: ${data}`);
    }, 2000, 10);

  });

  ws.on("close", () => {
    console.log("Client has disconnected");
  });
});

function loopWithDelay(callback, delay, max, min) {
  var i = min || 0;
  if (i <= max) {
    var id = setInterval(function() {
      callback(i);
      if (++i > max) clearInterval(id);
    }, delay);
  }
}
