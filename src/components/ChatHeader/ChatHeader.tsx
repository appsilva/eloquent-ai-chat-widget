import "./ChatHeader.css";

interface ChatHeaderProps {
  title: string;
  subtitle: string;
  primaryColor: string;
  isOnline: boolean;
}

const ChatHeader = ({
  title,
  subtitle,
  primaryColor,
  isOnline,
}: ChatHeaderProps) => (
  <div className="chat-header" style={{ backgroundColor: primaryColor }}>
    <div className="header-content">
      <div className="header-info">
        <h3 className="chat-title">{title}</h3>
        <p className="chat-subtitle">{subtitle}</p>
      </div>
      <div className="status-indicator">
        <div className={`status-dot ${isOnline ? "online" : "offline"}`}></div>
        <span className="status-text">{isOnline ? "Online" : "Offline"}</span>
      </div>
    </div>
  </div>
);

export default ChatHeader;
