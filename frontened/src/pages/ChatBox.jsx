import React from 'react';

const ChatBox = () => {
  return (
    <div className="relative pb-[85.25%] max-h-[900px] overflow-hidden border border-gray-300 rounded-lg shadow-sm bg-white">
      <iframe
        src="https://genai-edu-chatbot.streamlit.app/?embed=true"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full"
        title="Chatbot"
      ></iframe>
    </div>
  );
};

export default ChatBox;
