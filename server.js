require('dotenv').config()
const app = require('./src/app')
const { createServer } = require("http");
const { Server } = require("socket.io");
const generateResponse = require('./src/services/ai.service')

const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
  console.log('a user connected')
  // socket.on("disconnect",()=>{
  //   console.log("a user disconnected")
  // })

  // socket.on('event',(data)=>{console.log(data)}) //custom event
  socket.on('aiMessage',async (data)=>{
    console.log("recieved prompt", data.prompt)
    const response = await generateResponse(data.prompt);
    console.log(response)

    socket.emit('ai-message-response',{response})
  })
}); 

 

httpServer.listen(3000,()=>{
    console.log("Server running on port 3000")
})