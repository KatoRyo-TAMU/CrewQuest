import React, { useState } from 'react';
import { Interactions } from 'aws-amplify';

const ChatBot = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState([]);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userMessage = message;
    setMessage('');
    setResponse((prev) => [...prev, { message: userMessage, from: 'user' }]);

    // Send the message to Lex
    const botResponse = await Interactions.send('CrewQuest1', userMessage);
    setResponse((prev) => [...prev, { message: botResponse.message, from: 'bot' }]);
  };

  return (
    <div>
      <h2>Chat with Lex</h2>
      <div>
        {response.map((resp, index) => (
          <p key={index} className={resp.from}>
            <strong>{resp.from === 'user' ? 'You: ' : 'Bot: '}</strong>
            {resp.message}
          </p>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={message} onChange={handleChange} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatBot;
