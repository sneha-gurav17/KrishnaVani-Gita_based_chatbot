import "./ChatMessage.css";

function ChatMessage({ sender, text }) {
  return (
    <div className={`msg-box ${sender === "user" ? "right" : "left"}`}>
      <p>{text}</p>
    </div>
  );
}

export default ChatMessage;