import React, { useState } from "react";
import Chatbot from "./Components/Chatbot";
import "./App.css"; // Make sure to import the CSS file

function App() {
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <div className="App">
      {showChatbot && <Chatbot />}
      <button className="chat-button" onClick={() => setShowChatbot(!showChatbot)}>
        {showChatbot ? "Close Chat" : "Chat with us"}
      </button>
    </div>
  );
}

export default App;
