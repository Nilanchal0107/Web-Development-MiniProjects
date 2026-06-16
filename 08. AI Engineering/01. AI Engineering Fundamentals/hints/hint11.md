Step 5 — Parsing the response:

const data = await response.json();
const giftSuggestions = data.giftSuggestions;

Once you have giftSuggestions, pass it
through marked() and DOMPurify.sanitize()
just like before — your existing
renderGiftIdeas function handles this.

The only change is WHERE the content
comes from: data.giftSuggestions instead
of response.choices[0].message.content.
