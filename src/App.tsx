import { useState } from "react";
import ChatWidget from "./components/ChatWidget/ChatWidget";
import "./App.css";

function App() {
  const [isOnline, setIsOnline] = useState(true);
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [position, setPosition] = useState<
    "bottom-right" | "bottom-left" | "top-right" | "top-left"
  >("bottom-right");
  const [primaryColor, setPrimaryColor] = useState("#6f33b7");

  return (
    <div className={`app ${theme}`}>
      <header className="header">
        <h1>lquent AI Chat Widget Demo</h1>
      </header>

      <main className="main">
        <section className="controls">
          <h2>Widget Configuration</h2>

          <div className="control-group">
            <label>
              <input
                type="checkbox"
                checked={isOnline}
                onChange={(e) => setIsOnline(e.target.checked)}
              />
              Online Status
            </label>
          </div>

          <div className="control-group">
            <label>
              <input
                type="checkbox"
                checked={isMaintenanceMode}
                onChange={(e) => setIsMaintenanceMode(e.target.checked)}
              />
              Maintenance Mode
            </label>
          </div>

          <div className="control-group">
            <label>Theme:</label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value as "light" | "dark")}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          <div className="control-group">
            <label>Position:</label>
            <select
              value={position}
              onChange={(e) =>
                setPosition(
                  e.target.value as
                    | "bottom-right"
                    | "bottom-left"
                    | "top-right"
                    | "top-left"
                )
              }
            >
              <option value="bottom-right">Bottom Right</option>
              <option value="bottom-left">Bottom Left</option>
              <option value="top-right">Top Right</option>
              <option value="top-left">Top Left</option>
            </select>
          </div>

          <div className="control-group">
            <label>Primary Color:</label>
            <input
              type="color"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
            />
          </div>
        </section>

        <section className="features">
          <h2>Features</h2>
          <div className="feature-grid">
            <div className="feature">
              <h3>🎨 Modern Design</h3>
              <p>Clean UI following Eloquent AI style</p>
            </div>
            <div className="feature">
              <h3>📱 Responsive</h3>
              <p>Works on desktop and mobile devices</p>
            </div>
            <div className="feature">
              <h3>🌙 Dark/Light Themes</h3>
              <p>Support for both light and dark themes</p>
            </div>
            <div className="feature">
              <h3>🔧 Highly Customizable</h3>
              <p>Many configuration options</p>
            </div>
            <div className="feature">
              <h3>🚀 Easy Integration</h3>
              <p>Simple installation and setup</p>
            </div>
            <div className="feature">
              <h3>📍 Flexible Positioning</h3>
              <p>Choose from 4 corner positions</p>
            </div>
            <div className="feature">
              <h3>🔴 Online/Offline Status</h3>
              <p>Visual status indicators</p>
            </div>
            <div className="feature">
              <h3>🛠️ Maintenance Mode</h3>
              <p>Maintenance mode with custom messages</p>
            </div>
          </div>
        </section>

        <section className="installation">
          <h2>Installation</h2>
          <div className="code-examples">
            <div className="code-example">
              <h3>NPM Package</h3>
              <pre>
                <code>npm install @appsilva/lquent-ai-chat-widget</code>
              </pre>
            </div>
            <div className="code-example">
              <h3>React Component</h3>
              <pre>
                <code>{`import { ChatWidget } from '@appsilva/lquent-ai-chat-widget';

function App() {
  return (
    <ChatWidget
      apiEndpoint="/api/chat"
      title="Customer Support"
      primaryColor="#6f33b7"
    />
  );
}`}</code>
              </pre>
            </div>

            <div className="code-example">
              <h3>Embed Script</h3>
              <pre>
                <code>{`<script
  src="https://unpkg.com/@appsilva/lquent-ai-chat-widget/dist/embed.js"
  data-lquent-chat-widget
  data-api-endpoint="/api/chat"
  data-title="Customer Support"
  data-primaryColor="#6f33b7"
></script>`}</code>
              </pre>
            </div>
          </div>
        </section>
      </main>

      {/* Chat Widget */}
      <ChatWidget
        apiEndpoint="/api/chat"
        title="Demo Support"
        subtitle="Try the chat widget!"
        theme={theme}
        position={position}
        primaryColor={primaryColor}
        isOnline={isOnline}
        isMaintenanceMode={isMaintenanceMode}
        maintenanceMessage="We're currently performing maintenance. Please try again later."
      />
    </div>
  );
}

export default App;
