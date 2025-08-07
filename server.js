const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.SERVER_PORT || 5001;
const API_KEY = process.env.LLM_API_KEY;

app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "meta-llama/llama-4-scout-17b-16e-instruct",
          messages: [{ role: "user", content: message }],
        }),
      }
    );

    const data = await response.json();

    const reply =
      data?.choices?.[0]?.message?.content || "No response from model.";

    res.json({ reply });
  } catch (error) {
    console.error("Chat API Error:", error);
    res.status(500).json({
      reply: "Sorry, something went wrong. Please try again later.",
    });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
