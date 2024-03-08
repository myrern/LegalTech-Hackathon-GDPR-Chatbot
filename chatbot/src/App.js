import React, { useState, useEffect } from 'react';
import ChatWindow from './Components/ChatWindow';
import UserInput from './Components/UserInput';
import './App.css'; 

function App() {
  const answers = [
    "Welcome to our chatbot, how can I help you today?",
    "Could you provide more details?",
    "Thank you for providing the details.",
    "Our team will get back to you shortly.",
    // ... more predefined answers
  ];

  const [messages, setMessages] = useState([]);
  const [answerIndex, setAnswerIndex] = useState(0);
  const [currentBotMessage, setCurrentBotMessage] = useState('');

  const simulateTyping = (fullMessage, author) => {
    let typedMessage = '';
    const chars = fullMessage.split('');
    let charIndex = 0;
    
    const typeChar = () => {
      if (charIndex < chars.length) {
        typedMessage += chars[charIndex++];
        setCurrentBotMessage(typedMessage);
        setTimeout(typeChar, Math.floor(Math.random() * 150)); // Delay between each char
      } else {
        // Add the full message to the messages array
        setMessages(m => [...m, { content: typedMessage, author: 'bot' }]);
        setCurrentBotMessage('');
        // Move to the next answer
        if (author === 'bot') {
          setAnswerIndex(a => a + 1);
        }
      }
    };
    
    typeChar();
  };

  const handleSendMessage = (newMessage) => {
    if (newMessage.trim() !== '') {
      // Push the user's message
      setMessages(m => [...m, { content: newMessage, author: 'user' }]);
      // Prepare the bot's answer after a delay
      setTimeout(() => {
        if (!currentBotMessage && answerIndex < answers.length) {
          simulateTyping(answers[answerIndex], 'bot');
        }
      }, 1000); // Delay before typing starts
    }
  };

  return (
    <div className="app">
      <ChatWindow messages={messages} currentBotMessage={currentBotMessage} />
      <UserInput onSendMessage={handleSendMessage} />
    </div>
  );
}

export default App;
