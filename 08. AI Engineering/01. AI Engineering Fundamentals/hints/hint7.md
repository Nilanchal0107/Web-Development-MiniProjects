Step 3 — The chat completions call:

const response = await openai.chat.completions.create({
  model: process.env.AI_MODEL,
  messages,
});

This is the same call you've been making
in the browser — just without the
dangerouslyAllowBrowser flag.

The model comes from your environment
variables, and the messages array already
has your system prompt. You just pushed
the user's message in Step 2.