Step 2 — Extracting the prompt and adding it to messages:

const { userPrompt } = req.body;
messages.push({ role: "user", content: userPrompt });

This is the same pattern you used in the
browser — just pulling the prompt from
the request instead of an input field.

The property name (userPrompt) must match
exactly what the frontend sends in its
fetch body.
