import { Dispatch, SetStateAction } from "react";
import { Message } from "../components/ChatWidget/ChatWidget";

/**
 * Formats a Date object into a human-readable time string (HH:MM AM/PM).
 * @param {Date} date - The date to format.
 * @returns {string} The formatted time string.
 */
export const formatTime = (date: Date) =>
  new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

/**
* Sends a user message to the chat API and updates the message state with the response.
*
* @param {string} input - The user's input message.
* @param {string} apiEndpoint - The API endpoint to send the message to.
* @param {boolean} isMaintenanceMode - Whether the chat is in maintenance mode.
* @param {Dispatch<SetStateAction<Message[]>>} setMessages - State setter for the messages array.
* @param {Dispatch<SetStateAction<string>>} setInput - State setter for the input field.
* @param {Dispatch<SetStateAction<boolean>>} setLoading - State setter for the loading state.
* @returns {Promise<void>} A promise that resolves when the message has been processed.
*/
export const sendMessageUtil = async (
  input: string,
  apiEndpoint: string,
  isMaintenanceMode: boolean,
  setMessages: Dispatch<SetStateAction<Message[]>>,
  setInput: Dispatch<SetStateAction<string>>,
  setLoading: Dispatch<SetStateAction<boolean>>
): Promise<void> => {
  if (!input.trim() || isMaintenanceMode) return;

  const userMessage: Message = {
    id: Date.now().toString(),
    sender: "user",
    content: input,
    timestamp: new Date(),
  };
  setMessages((prev) => [...prev, userMessage]);
  setInput("");
  setLoading(true);

  try {
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      sender: "ai",
      content: data.reply || "I'm sorry, I couldn't process your request.",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, aiMessage]);
  } catch {
    const errorMessage: Message = {
      id: (Date.now() + 1).toString(),
      sender: "ai",
      content: "Sorry, something went wrong. Please try again later.",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, errorMessage]);
  } finally {
    setLoading(false);
  }
};
