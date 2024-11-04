import React, { useState, useEffect } from 'react';
import './Chatbot.css'; // Import the CSS file

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (input.trim() === "") return;
    
    const userMessage = { sender: "user", message: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");

    try {
      const response = await fetch("http://localhost:5005/webhooks/rest/webhook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ sender: "user", message: input })
      });
      
      const data = await response.json();
      
      data.forEach((msg) => {
        const botMessage = { sender: "bot", message: msg.text || "", buttons: msg.buttons || [] };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      });
      
    } catch (error) {
      console.error("Error in sending message:", error);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chat-header">
        <div className="avatar">👤</div>
        <div className="header-info">
          <p>Chat with</p>
          <h3>ANDON THE AiBOT</h3>
          <p className="online-status">We’re online</p>
        </div>
      </div>

      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <p>{msg.message}</p>
            {msg.buttons && msg.buttons.length > 0 && (
              <div className="buttons-container">
                {msg.buttons.map((button, btnIndex) => (
                  <button 
                    key={btnIndex} 
                    onClick={() => window.location.href = button.payload}>
                    {button.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="input-box">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Enter your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chatbot;