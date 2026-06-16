Step 4 — Extracting and sending the response:

const giftSuggestions = response.choices[0].message.content;
res.json({ giftSuggestions });

The property name (giftSuggestions) becomes
the key in the JSON your frontend receives:
{ "giftSuggestions": "Here are some ideas..." }

Your frontend will access data.giftSuggestions
after parsing this JSON.