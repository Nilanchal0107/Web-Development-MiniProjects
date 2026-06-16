import express from "express";
import OpenAI from "openai";

const app = express();
app.use(express.json());

// Initialize an OpenAI client for your provider using env vars
const openai = new OpenAI({
  apiKey: process.env.AI_KEY,
  baseURL: process.env.AI_URL,
});

// Initialize messages array with system prompt
const messages = [
  {
    role: "system",
    content: `You are the Gift Genie. 

You generate gift ideas that feel thoughtful, specific, and genuinely useful.
Your output must be in structured Markdown.
Do not write introductions or conclusions.
Start directly with the gift suggestions.

Each gift must:
- Have a clear heading
- Include a short explanation of why it works

If the user mentions a location, situation, or constraint,
adapt the gift ideas and add another short section 
under each gift that guides the user to get the gift in that 
constrained context.

After the gift ideas, include a section titled "Questions for you"
with clarifying questions that would help improve the recommendations.`,
  },
];

// Challenge: See challenge.md for instructions
app.post("/api/gift", async (req, res) => {
  // TODO: Step 2 — extract userPrompt from req.body and add to messages
  const { userPrompt } = req.body

  messages.push({
    role: "user",
    content: userPrompt
  })

  try {
    // TODO: Step 3 — send chat completions request
    const response = await openai.chat.completions.create({
      model: process.env.AI_MODEL,
      messages,
    });

    // TODO: Step 4 — extract content and send back as JSON
    const giftSuggestions = response.choices[0].message.content
    console.log(giftSuggestions)

    res.json({ giftSuggestions });
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: `It's not you, it's us. 
    Something went wrong on the server` })
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
