import "./ChatInput.css";

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  sendMessage: () => void;
  loading: boolean;
  isMaintenanceMode: boolean;
  primaryColor: string;
  inputRef: React.RefObject<HTMLInputElement>;
}

const ChatInput = ({
  input,
  setInput,
  onKeyDown,
  sendMessage,
  loading,
  isMaintenanceMode,
  primaryColor,
  inputRef,
}: ChatInputProps) => (
  <div className="input-container">
    <input
      ref={inputRef}
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={onKeyDown}
      disabled={loading || isMaintenanceMode}
      placeholder={
        isMaintenanceMode
          ? "Chat temporarily unavailable"
          : "Type your message..."
      }
      className="message-input"
    />
    <button
      onClick={sendMessage}
      disabled={loading || !input.trim() || isMaintenanceMode}
      className="send-button"
      style={{ backgroundColor: primaryColor }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  </div>
);

export default ChatInput;
