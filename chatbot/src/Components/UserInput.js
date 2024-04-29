// UserInput.js
import React, { useState } from 'react';

function UserInput({ onSendMessage }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSendMessage(message);
    setMessage('');
  };

  return (
    <div className="user-input">
      <div className="user-input-container"> {/* Add this wrapper */}
      <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Start med å skrive inn hva du vil gjøre"
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)} // Handle the Enter key press
          />
        <button type="submit" onClick={handleSubmit}>Send</button>
      </div>
    </div>
  );
}

export default UserInput;
