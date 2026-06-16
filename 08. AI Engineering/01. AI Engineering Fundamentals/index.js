import { marked } from "marked";
import DOMPurify from "dompurify";
import { autoResizeTextarea, setLoading } from "./utils.js";

// Get UI elements
const giftForm = document.getElementById("gift-form");
const userInput = document.getElementById("user-input");
const outputContent = document.getElementById("output-content");

function start() {
  // Setup UI event listeners
  userInput.addEventListener("input", () => autoResizeTextarea(userInput));
  giftForm.addEventListener("submit", handleGiftRequest);
}

async function handleGiftRequest(e) {
  // Prevent default form submission
  e.preventDefault();

  // Get user input, trim whitespace, exit if empty
  const userPrompt = userInput.value.trim();
  if (!userPrompt) return;

  // Set loading state (hides output, animates lamp)
  setLoading(true);

  try {
    // TODO: Step 1 — send fetch request to /api/gift
    const response = await fetch("/api/gift", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userPrompt }),
    });

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message)
    }

    // TODO: Step 5 — parse response and extract giftSuggestions
    const giftSuggestions = data.giftSuggestions;

    // Convert Markdown to HTML
    const html = marked.parse(giftSuggestions);

    // Sanitize the HTML to prevent XSS attacks
    const safeHTML = DOMPurify.sanitize(html);

    // Render the result
    outputContent.innerHTML = safeHTML;
  } catch (error) {
    // Log the error for debugging
    console.error(error);

    // Display friendly error message
    outputContent.textContent =
      "Sorry, I can't access what I need right now. Please try again in a bit.";
  } finally {
    // Always clear loading state (shows output, resets lamp)
    setLoading(false);
  }
}

start();
