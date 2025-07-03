const OPENAI_API_KEY = 
import.meta.env.VITE_OPENAI_API_KEY;
const firebaseConfig = {
  apiKey: "AIzaSyAIWOdp6m3JMOLeQ-rIgIFJ-8VwkwBpJ5k",
  authDomain: "crideros-sign-in.firebaseapp.com",
  projectId: "crideros-sign-in",
  storageBucket: "crideros-sign-in.appspot.com",
  messagingSenderId: "470579826527",
  appId: "1:470579826527:web:09273c1f6693676120b0ea",
  measurementId: "G-XT07NH6NBF"
};

function checkTokenLimit() {
  const maxTokens = 1500;
  const usedTokens = 0; // You can link this to usage tracking
  if (usedTokens > maxTokens) {
    alert("Token limit reached.");
    return false;
  }
  return true;
}

async function sendMessage(userMessage) {
  if (!checkTokenLimit()) return;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [{ role: "user", content: userMessage }],
      max_tokens: 300
    })
  });

  const data = await response.json();
  const botReply = data.choices?.[0]?.message?.content;
  appendMessage("CriderOS", botReply || "⚠️ Error: No response");
}

function appendMessage(sender, text) {
  const chat = document.getElementById("chat");
  const msg = document.createElement("div");
  msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chat.appendChild(msg);
}
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();


});

app.use(express.json());

// 🔧 ADD THIS ↓↓↓↓↓
app.get('/', (req, res) => {
  res.send('🚀 CriderOS API is live!');
app.get('/', (req, res) => {
  app.get('/', (req, res) => {
  res.send('🟢 CriderOS API is running. All systems good!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
