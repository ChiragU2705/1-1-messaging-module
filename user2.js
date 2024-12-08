// Import Firestore instance from firebase-app.js
import { db } from "./firebase-app.js";
import { collection, addDoc, onSnapshot, orderBy, query, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";

// DOM Elements
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const messageDisplay = document.getElementById("messageDisplay");

// Send a Message
sendButton.addEventListener("click", async () => {
  const text = messageInput.value.trim();

  if (text === "") {
    alert("Message cannot be empty!");
    return;
  }

  try {
    // Add the message to Firestore
    await addDoc(collection(db, "messages"), {
      sender: "User2", // Sender
      receiver: "User1", // Receiver
      text: text, // Message Text
      timestamp: serverTimestamp(), // Server-side Timestamp
    });

    console.log("Message sent:", text);
    messageInput.value = ""; // Clear input field after sending
  } catch (error) {
    console.error("Error sending message:", error);
  }
});

// Listen for Incoming Messages
const q = query(collection(db, "messages"), orderBy("timestamp"));

onSnapshot(q, (snapshot) => {
  messageDisplay.innerHTML = ""; // Clear message display before re-rendering

  snapshot.forEach((doc) => {
    const message = doc.data();
    const messageElement = document.createElement("div");

    // Style messages differently for sender and receiver
    if (message.sender === "User2") {
      messageElement.classList.add("message", "sent");
    } else if (message.receiver === "User2") {
      messageElement.classList.add("message", "received");
    } else {
      return; // Ignore messages not meant for User2
    }

    messageElement.textContent = `${message.sender}: ${message.text}`;
    messageDisplay.appendChild(messageElement);
  });

  // Auto-scroll to the bottom of the messages
  messageDisplay.scrollTop = messageDisplay.scrollHeight;
});