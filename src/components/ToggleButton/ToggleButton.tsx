import "./ToggleButton.css";

interface ToggleButtonProps {
  isOpen: boolean;
  onClick: () => void;
  primaryColor: string;
}

const ToggleButton = ({ isOpen, onClick, primaryColor }: ToggleButtonProps) => (
  <button
    className="chat-toggle-button"
    onClick={onClick}
    style={{ backgroundColor: primaryColor }}
    aria-label={isOpen ? "Close chat" : "Open chat"}
  >
    {isOpen ? (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M18 6L6 18M6 6L18 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ) : (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )}
  </button>
);

export default ToggleButton;
