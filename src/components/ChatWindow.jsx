import { useState, useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import TypingBubble from "./TypingBubble";
import { findShloka } from "../utils/findShloka";
import "./ChatWindow.css";

function ChatWindow() {
  const [messages, setMessages] = useState([
    {
      sender: "krishna",
      text: "🌸 Welcome, dear soul. Wisdom from the Bhagavad Gita awaits you. Share your mood ✨",
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    const verse = findShloka(input);
    setInput("");

    setIsTyping(true);

    setTimeout(() => {
  let botText = "";

  if (verse.isFallback) {
    // ✅ ONLY show simple message
    botText = verse.message;
  } else {
    // ✅ Full Gita response
    botText = `📖 Bhagavad Gita – Chapter ${verse.chapter}, Verse ${verse.verse}

🕉️ Shloka:
${verse.shloka}

🌼 Translation:
${verse.translation}

💛 Message:
${verse.message}`;
  }

  setMessages(prev => [
    ...prev,
    { sender: "krishna", text: botText }
  ]);

  setIsTyping(false);
}, 900);

  };

  return (
    <div className="chat-container">
      <div className="chat-box" ref={chatRef}>
        {messages.map((msg, i) => (
          <ChatMessage key={i} sender={msg.sender} text={msg.text} />
        ))}

        {isTyping && <TypingBubble />}
      </div>

      <div className="input-area">
        <input
          type="text"
          placeholder="Let your thoughts flow to Krishna..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatWindow;
