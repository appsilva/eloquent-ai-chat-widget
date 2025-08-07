import {
  useState,
  useEffect,
  useRef,
  CSSProperties,
  KeyboardEvent,
} from "react";
/**
 * Since these components are only used inside ChatWidget, I could have created a components dir
 * inside ChatWidget's dir. It's a startegy I see adopted often, but to make it easier to follow
 * (hopefully!), I decided to keep everything under the main components' dir.
 * In the end, it's just a matter of taste.
 */
import ChatInput from "../ChatInput/ChatInput";
import MaintenanceBanner from "../MaintenanceBanner/MaintenanceBanner";
import MessagesContainer from "../MessagesContainer/MessagesContainer";
import ToggleButton from "../ToggleButton/ToggleButton";
import ChatHeader from "../ChatHeader/ChatHeader";
import { formatTime, sendMessageUtil } from "../../utils/sendMessage.utils";

import "./ChatWidget.css";

export interface ChatWidgetProps {
  apiEndpoint?: string;
  initialMessage?: string;
  theme?: "light" | "dark";
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  primaryColor?: string;
  title?: string;
  subtitle?: string;
  isOnline?: boolean;
  isMaintenanceMode?: boolean;
  maintenanceMessage?: string;
  className?: string;
  style?: CSSProperties;
}

export interface Message {
  id: string;
  sender: "user" | "ai";
  content: string;
  timestamp: Date;
}

const ChatWidget = ({
  apiEndpoint = "/api/chat",
  initialMessage = "Hello! How can I help you today?",
  theme = "light",
  position = "bottom-right",
  primaryColor = "#6f33b7",
  title = "Chat Support",
  subtitle = "We're here to help!",
  isOnline = true,
  isMaintenanceMode = false,
  maintenanceMessage = "We're currently performing maintenance. Please try again later.",
  className = "",
  style = {},
}: ChatWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    const stored = localStorage.getItem("messages");
    return stored
      ? JSON.parse(stored)
      : [
          {
            id: "1",
            sender: "ai",
            content: initialMessage,
            timestamp: new Date(),
          },
        ];
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = () =>
    sendMessageUtil(
      input,
      apiEndpoint,
      isMaintenanceMode,
      setMessages,
      setInput,
      setLoading
    );

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const widgetClass = `lquent-chat-widget ${theme} ${position} ${
    isOpen ? "open" : ""
  } ${className}`;

  return (
    <div className={widgetClass} style={style}>
      <ToggleButton
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        primaryColor={primaryColor}
      />

      <div className="chat-window">
        <ChatHeader
          title={title}
          subtitle={subtitle}
          primaryColor={primaryColor}
          isOnline={isOnline}
        />

        <MessagesContainer
          messages={messages}
          primaryColor={primaryColor}
          formatTime={formatTime}
          loading={loading}
          messagesEndRef={messagesEndRef}
        />

        {isMaintenanceMode && (
          <MaintenanceBanner maintenanceMessage={maintenanceMessage} />
        )}

        <ChatInput
          input={input}
          setInput={setInput}
          onKeyDown={handleKeyPress}
          sendMessage={sendMessage}
          loading={loading}
          isMaintenanceMode={isMaintenanceMode}
          primaryColor={primaryColor}
          inputRef={inputRef}
        />
      </div>
    </div>
  );
};

export default ChatWidget;
