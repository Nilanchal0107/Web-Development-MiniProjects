Step 1 — Here's what the fetch call looks like:

const response = await fetch("/api/gift", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ userPrompt }),
});

Breaking this down:

- method: "POST" because we're sending data
- headers: tells the server to expect JSON
- body: the actual data, converted to a string

JSON.stringify is required because fetch
can only send strings over the network,
not JavaScript objects.

The property name { userPrompt } must match
what the server looks for in req.body.
