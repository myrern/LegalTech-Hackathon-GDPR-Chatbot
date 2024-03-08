import React from 'react';
import userIcon from '../assets/user-icon.png';
import botIcon from '../assets/bot-icon.png';

// ...

function ChatWindow({ messages, currentBotMessage  }) {
    return (
      <div className="chat-window">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.author}`}>
            <div className="message-header">
              <img
                src={message.author === 'user' ? userIcon : botIcon}
                alt={`${message.author} icon`}
                className="message-icon"
              />
              <span className="message-name">{message.author === 'user' ? 'User' : 'Bot'}</span>
            </div>
            <div className="message-text">{message.content}</div>
          </div>
        ))}
      {currentBotMessage && (
        <div className="message bot">
          <div className="message-header">
            <img src={botIcon} alt="Bot icon" className="message-icon" />
            <span className="message-name">Bot</span>
          </div>
          <div className="message-text">{currentBotMessage}</div>
        </div>
      )}
      </div>
    );
}

export default ChatWindow;