# Challenge: Backend Migration

Your task is to wire up the frontend and backend
so AI requests happen on the server.


---

## Step 1: Frontend sends the request

In `index.js`, replace the TODO with a fetch call.

Send the user's prompt to `/api/gift` as a POST request.

---

## Step 2: Server handles the request

In `server.js`, extract the prompt from `req.body`.

Add it to the messages array as a user message.

---

## Step 3: Server calls the AI

Send a chat completions request using the OpenAI SDK.

The setup is already done — you just need to make the call.

---

## Step 4: Server returns the response

Extract the AI's message content from the response.

Send it back to the frontend as JSON.

---

## Step 5: Frontend renders the output

Back in `index.js`, parse the JSON response.

Extract the content and render it with marked + DOMPurify.

---

💡 Check the hints folder if you get stuck!
