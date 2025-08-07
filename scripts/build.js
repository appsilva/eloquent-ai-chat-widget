const { mkdirSync, writeFileSync } = require("fs");

console.log("🚀 Building lquent AI Chat Widget embed script...");

try {
  mkdirSync("dist", { recursive: true });
} catch (error) {
  // Directory might already exist
  console.error("❌ Failed to create dist directory:", error);
}

// Create the embed script with fixed attribute parsing
const embedScript = `
// lquent AI Chat Widget Embed Script
(function() {
  'use strict';

  // Initialize widget
  function initWidget(config = {}) {
    try {
      // Load CSS
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/@appsilva/lquent-ai-chat-widget@latest/dist/index.css';
      document.head.appendChild(link);

      // Create container
      const container = document.createElement('div');
      container.id = 'lquent-chat-widget-container';
      document.body.appendChild(container);

      // Widget HTML
      const widgetHTML = \`
        <div class="lquent-chat-widget \${config.theme || 'light'} \${config.position || 'bottom-right'}">
          <button class="chat-toggle-button" style="background-color: \${config.primaryColor || '#6f33b7'}">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <div class="chat-window">
            <div class="chat-header" style="background-color: \${config.primaryColor || '#6f33b7'}">
              <div class="header-content">
                <div class="header-info">
                  <h3 class="chat-title">\${config.title || 'Chat Support'}</h3>
                  <p class="chat-subtitle">\${config.subtitle || 'We\\'re here to help!'}</p>
                </div>
                <div class="status-indicator">
                  <div class="status-dot \${config.isOnline !== false ? 'online' : 'offline'}"></div>
                  <span class="status-text">\${config.isOnline !== false ? 'Online' : 'Offline'}</span>
                </div>
              </div>
            </div>
            <div class="messages-container">
              <div class="message ai-message">
                <div class="message-content">
                  <div class="message-text">\${config.initialMessage || 'Hello! How can I help you today?'}</div>
                  <div class="message-time">\${new Date().toLocaleTimeString()}</div>
                </div>
              </div>
            </div>
            \${config.isMaintenanceMode ? \`
              <div class="maintenance-banner">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>\${config.maintenanceMessage || 'We\\'re currently performing maintenance. Please try again later.'}</span>
              </div>
            \` : ''}
            <div class="input-container">
              <input type="text" class="message-input" placeholder="\${config.isMaintenanceMode ? 'Chat temporarily unavailable' : 'Type your message...'}" \${config.isMaintenanceMode ? 'disabled' : ''}>
              <button class="send-button" style="background-color: \${config.primaryColor || '#6f33b7'}" \${config.isMaintenanceMode ? 'disabled' : ''}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      \`;

      container.innerHTML = widgetHTML;

      // Add interactivity
      const toggleButton = container.querySelector('.chat-toggle-button');
      const chatWindow = container.querySelector('.chat-window');
      const input = container.querySelector('.message-input');
      const sendButton = container.querySelector('.send-button');

      if (toggleButton && chatWindow) {
        toggleButton.addEventListener('click', () => {
          chatWindow.style.opacity = chatWindow.style.opacity === '1' ? '0' : '1';
          chatWindow.style.visibility = chatWindow.style.visibility === 'visible' ? 'hidden' : 'visible';
          chatWindow.style.transform = chatWindow.style.transform === 'translateY(0px)' ? 'translateY(10px)' : 'translateY(0px)';
        });
      }

      if (input && sendButton && !config.isMaintenanceMode) {
        const sendMessage = async () => {
          const message = input.value.trim();
          if (!message) return;

          // Add user message
          const messagesContainer = container.querySelector('.messages-container');
          const userMessage = document.createElement('div');
          userMessage.className = 'message user-message';
          userMessage.innerHTML = \`
            <div class="message-content" style="background-color: \${config.primaryColor || '#6f33b7'}">
              <div class="message-text">\${message}</div>
              <div class="message-time">\${new Date().toLocaleTimeString()}</div>
            </div>
          \`;
          messagesContainer.appendChild(userMessage);

          input.value = '';

          // Simulate AI response
          setTimeout(() => {
            const aiMessage = document.createElement('div');
            aiMessage.className = 'message ai-message';
            aiMessage.innerHTML = \`
              <div class="message-content">
                <div class="message-text">Thanks for your message! This is a demo response.</div>
                <div class="message-time">\${new Date().toLocaleTimeString()}</div>
              </div>
            \`;
            messagesContainer.appendChild(aiMessage);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
          }, 1000);
        };

        sendButton.addEventListener('click', sendMessage);
        input.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
            sendMessage();
          }
        });
      }
    } catch (error) {
      console.error('❌ Failed to initialize lquent AI Chat Widget:', error);
    }
  }

  // Expose the widget globally
  window.lquentChatWidget = {
    init: initWidget
  };

  // Auto-initialize if data attributes are present
  document.addEventListener('DOMContentLoaded', () => {
    const script = document.querySelector('script[data-lquent-chat-widget]');
    if (script) {
      const config = {};

      // Define mapping from kebab-case attribute names to camelCase config keys
      const attributeMap = {
        'api-endpoint': 'apiEndpoint',
        'title': 'title',
        'subtitle': 'subtitle',
        'primary-color': 'primaryColor',
        'is-online': 'isOnline',
        'theme': 'theme',
        'position': 'position',
        'initial-message': 'initialMessage',
        'is-maintenance-mode': 'isMaintenanceMode',
        'maintenance-mode': 'isMaintenanceMode',
        'maintenance-message': 'maintenanceMessage',
      };

      // Parse data attributes
      const attributes = script.attributes;
      for (let i = 0; i < attributes.length; i++) {
        const attr = attributes[i];
        if (attr.name.startsWith('data-') && attr.name !== 'data-lquent-chat-widget') {
          const rawKey = attr.name.replace('data-', '').toLowerCase();
          const configKey = attributeMap[rawKey] || rawKey;
          let value = attr.value;

          // Parse boolean values
          if (value === 'true') value = true;
          else if (value === 'false') value = false;

          config[configKey] = value;
        }
      }

      initWidget(config);
    }
  });
})();
`;

writeFileSync("dist/embed.js", embedScript);

console.log("🎉 Embed script build completed successfully!");
