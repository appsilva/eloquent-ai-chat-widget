import { Message } from "../ChatWidget/ChatWidget";

import "./MessageItem.css";

interface MessageItemProps {
  message: Message;
  primaryColor: string;
  formatTime: (date: Date) => string;
}

const MessageItem = ({
  message,
  primaryColor,
  formatTime,
}: MessageItemProps) => (
  <div
    className={`message ${
      message.sender === "user" ? "user-message" : "ai-message"
    }`}
  >
    <div
      className="message-content"
      style={message.sender === "user" ? { backgroundColor: primaryColor } : {}}
    >
      <div className="message-text">{message.content}</div>
      <div className="message-time">{formatTime(message.timestamp)}</div>
    </div>
  </div>
);

export default MessageItem;
