var http = require("http");
const WebSocket = require('ws');

http.createServer(function (request, response) {    

   let currentTime = new Date().getTime();

   const ws = new WebSocket("ws://localhost:8082");

   ws.addEventListener("open", () => {
      console.log(`${currentTime} - Handshake with server successfull\n`);
      ws.send(`${currentTime}`);
   });

   ws.addEventListener("message", ({ data }) => {
      console.log(`Server has sent: ${data}`);
   });

   ws.addEventListener("close", () => {
      console.log("Bye bye server");
   });
   
   response.end();

}).listen(8081);

console.log('Client running at http://localhost:8081/');