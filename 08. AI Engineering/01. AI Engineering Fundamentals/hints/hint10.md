fetch() returns a Response object,
not your data directly.

You need to:
1. Parse the JSON body with response.json()
2. Extract the content property
3. Render it like before

Remember: response.json() is async —
it returns a Promise, so you need await.
