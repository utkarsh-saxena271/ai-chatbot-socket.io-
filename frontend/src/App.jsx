import { useState, useEffect } from 'react'
import { io } from "socket.io-client";
import './App.css'

function App() {
  const [socket, setSocket] = useState(null)
  const [message, setMessage] = useState('')
  const [conversations, setConversations] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim()) {
      // Add outgoing message
      setConversations([...conversations, { text: message, time: new Date().toLocaleTimeString(), type: 'outgoing' }])
      socket.emit('ai-message',message )
      setMessage('')
    }
  }
  useEffect(()=>{
    let  socketInstance = io("http://localhost:3000");
    setSocket(socketInstance)

    socketInstance.on('ai-message-response',(response)=>{
       const botMessage = {
        id: Date.now()+1,
        text : response,
        sender: 'bot',
        type : 'incoming'
       }
       setConversations(prevConversations => [
          ...prevConversations, botMessage
        ])
    })
  },[ ])

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>My Ai-Chatbot</h1>
      </div>
      
      <div className="messages-container">
        {conversations.map((msg, index) => (
          <div key={index} className={`message ${msg.type}`}>
            <div className="message-content">{msg.text}</div>
            <div className="message-time">{msg.time}</div>
          </div>
        ))}
      </div>

      <form className="input-container" onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="message-input"
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  )
}

export default App
