import React, { useEffect, useRef } from 'react';
import userIcon from '../assets/user-icon.png';
import botIcon from '../assets/bot-icon.png';
import './ChatWindow.css';

function ChatWindow({ messages, currentBotMessage }) {
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, currentBotMessage]); // Reacts to changes in both messages and currentBotMessage

  return (
    <div className="chat-window">
      {messages.length === 0 && !currentBotMessage ? (
        <div className="chat-placeholder">
          <img src={botIcon} alt="Bot Logo" className="bot-logo" />
          <div style={{ fontWeight: 'bold', fontSize: 'larger' }}>Enkle spørsmål, profesjonelle svar</div>
        </div>
      ) : (
        <>
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.author}`}>
              <div className="message-header">
                <img
                  src={message.author === 'user' ? userIcon : botIcon}
                  alt={`${message.author} icon`}
                  className="message-icon"
                />
                <span className="message-name">{message.author === 'user' ? 'Thomas' : 'ProtoBot'}</span>
              </div>
              <div className="message-text" dangerouslySetInnerHTML={{ __html: message.content }}></div>
            </div>
          ))}
          {currentBotMessage && (
            <div className="message bot">
              <div className="message-header">
                <img src={botIcon} alt="Bot icon" className="message-icon" />
                <span className="message-name">ProtoBot</span>
              </div>
              <div className="message-text" dangerouslySetInnerHTML={{ __html: currentBotMessage }}></div>
            </div>
          )}
          <div ref={endOfMessagesRef} />
        </>
      )}
    </div>
  );
}

export default ChatWindow;