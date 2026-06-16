Not sure if Step 1 is working?

Add a console.log in your server route:

console.log("Request received:", req.body);

If you see the prompt in your terminal,
the frontend is talking to the server correctly.

If you see nothing, check:
- Is the backend server running?
- Is the fetch URL correct? (/api/gift)
- Did you include the Content-Type header?
