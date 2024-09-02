import React, { useEffect, useState,useContext } from 'react';
import './chat.css'
import { FileContext } from '../../context/fileContext.jsx';
import {v4} from "uuid"

const Chat = () => { 
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const {fileContext} = useContext(FileContext)

  useEffect(()=>{
    const startChat = async ()=>{
            // try {
            console.log("started message")
            
              let userId = v4()
              localStorage.setItem('userId',userId);
            
            const response = await fetch('/api/generate/chat/start', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ userId, text: fileContext }),
            });
      
            const data = await response.json();
            console.log(data)
            const botMessage = { sender: 'bot', text: data.answer };
      
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        //   } catch (error) {
        //     console.error('Error:', error);
        //     const errorMessage = { sender: 'bot', text: 'Sorry, something went wrong.' };
        //     setMessages((prevMessages) => [...prevMessages, errorMessage]);
        //   }
    }

    startChat()

  },[])


  const sendMessage = async () => {
    if (input.trim() === '') return;
    let userId = localStorage.getItem('userId')
    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);

    setInput(''); // Clear input field

    try {
        console.log("sending message")
      const response = await fetch('/api/generate/chat/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId,message: input }),
      });

      const data = await response.json();
      console.log(data)
      const botMessage = { sender: 'bot', text: data.answer };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { sender: 'bot', text: 'Sorry, something went wrong.' };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <div className="input-box">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
