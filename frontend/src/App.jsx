import { useState } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('')
  const [conversations, setConversations] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim()) {
      // Add outgoing message
      setConversations([...conversations, { text: message, time: new Date().toLocaleTimeString(), type: 'outgoing' }])
      
      // Simulate incoming message after 1 second
      setTimeout(() => {
        setConversations(prevConversations => [
          ...prevConversations, 
          { 
            text: `Reply to: ${message}`, 
            time: new Date().toLocaleTimeString(), 
            type: 'incoming'
          }
        ])
      }, 1000)
      
      setMessage('')
    }
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>Chat Application</h1>
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
