import { useState } from "react";

const MentorGChat = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [userPrompt, setUserPrompt] = useState("");
  const [socraticMode, setSocraticMode] = useState(false);

  const userMessageStyle = {
    textAlign: 'right',
    backgroundColor: '#dcf8c6', // User message box color (original)
    padding: '10px',
    borderRadius: '8px',
    margin: '10px 0',
    maxWidth: '60%',
    alignSelf: 'flex-end',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  };

  const teacherMessageStyle = {
    textAlign: 'left',
    backgroundColor: '#f1f0f0', // Teacher message box color (original)
    padding: '10px',
    borderRadius: '8px',
    margin: '10px 0',
    maxWidth: '60%',
    alignSelf: 'flex-start',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  };

  const chatBoxContainerStyle = {
    height: '600px',
    overflowY: 'auto',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    marginBottom: '20px',
    backgroundColor: '#fafafa',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  };

  const buttonStyle = {
    backgroundColor: '#E67715', // Button color
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    padding: '10px 20px',
    transition: 'background-color 0.3s',
  };

  const inputStyle = {
    width: '80%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginRight: '10px',
    outline: 'none',
  };

  const handleUserSubmit = async () => {
    if (!userPrompt) return;

    const newChatHistory = [...chatHistory, { role: "user", content: userPrompt }];
    setChatHistory(newChatHistory);

    let messages = [
      { role: "system", content: "You are a helpful assistant" },
      ...newChatHistory,
    ];

    if (socraticMode) {
      const socraticPrompt = `Teach me about ${userPrompt} using the Socratic method. Start by asking a fundamental question to help me explore and understand the topic. Build on my responses with additional questions that encourage deeper thinking and understanding.`;
      messages[0].content = socraticPrompt;
    }

    const assistantResponse = await getAssistantResponseFromGroq(messages);
    setChatHistory([...newChatHistory, { role: "assistant", content: assistantResponse }]);
    setUserPrompt("");
  };

  async function getAssistantResponseFromGroq(messages) {
    const apiKey = import.meta.env.VITE_CHATBOX_API_KEY;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: messages
      })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data from Groq API');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }

  const formatResponseToJSX = (response) => {
    const sections = response.split(/```/g);

    return sections.map((section, index) => {
      if (index % 2 === 1) {
        const langMatch = section.match(/^(python|js|javascript|html|css|.*)$/i);
        const codeContent = langMatch ? section.slice(langMatch[0].length).trim() : section.trim();
        const langClass = langMatch ? langMatch[0] : "";

        return (
          <pre key={index} className={`language-${langClass}`}>
            <code>{codeContent}</code>
          </pre>
        );
      } else {
        const parts = section.split(/\*\*(.*?)\*\*/g);
        return (
          <span key={index}>
            {parts.map((part, idx) =>
              idx % 2 === 1 ? <strong key={idx}>{part}</strong> : part
            )}
            <br />
          </span>
        );
      }
    });
  };

  return (
    <div className="text-center p-4" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#333' }}>Ask from MentorG 👨‍💻</h1>

      <button onClick={() => setSocraticMode(!socraticMode)} style={buttonStyle}>
        {socraticMode ? "Disable Socratic Mode" : "Enable Socratic Mode"}
      </button>

      {socraticMode && <p style={{ fontStyle: 'italic', color: '#555', margin: '10px 0' }}>Socratic Mode enabled!</p>}

      <div style={{ marginTop: '20px' }}>
        <div style={chatBoxContainerStyle}>
          {chatHistory.map((message, index) => (
            <div key={index} style={message.role === "user" ? userMessageStyle : teacherMessageStyle}>
              <strong>{message.role === "user" ? "You: " : "Teacher: "}</strong>
              <p>{formatResponseToJSX(message.content)}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: "20px", display: 'flex', justifyContent: 'center' }}>
        <input
          type="text"
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
          placeholder="Ask a question about DSA..."
          style={inputStyle}
        />
        <button onClick={handleUserSubmit} style={buttonStyle}>
          Send
        </button>
      </div>
    </div>
  );
};

export default MentorGChat;