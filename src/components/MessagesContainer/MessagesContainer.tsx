import { Message } from "../ChatWidget/ChatWidget";
import MessageItem from "../MessageItem/MessageItem";

import "./MessagesContainer.css";

interface MessagesContainerProps {
  messages: Message[];
  primaryColor: string;
  formatTime: (date: Date) => string;
  loading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const MessagesContainer = ({
  messages,
  primaryColor,
  formatTime,
  loading,
  messagesEndRef,
}: MessagesContainerProps) => (
  <div className="messages-container">
    {messages.map((message) => (
      <MessageItem
        key={message.id}
        message={message}
        primaryColor={primaryColor}
        formatTime={formatTime}
      />
    ))}
    {loading && (
      <div className="message ai-message">
        <div className="message-content">
          <div className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    )}
    <div ref={messagesEndRef} />
  </div>
);

export default MessagesContainer;
