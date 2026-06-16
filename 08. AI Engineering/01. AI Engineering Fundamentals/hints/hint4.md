When the frontend sends JSON,
Express parses it into req.body.

The middleware is already set up —
you just need to extract the prompt.

Use destructuring to pull out
the property name from req.body,
then push a user message to the
messages array.
