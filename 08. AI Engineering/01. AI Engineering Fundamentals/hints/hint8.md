The frontend doesn't need the full
OpenAI response object.

It just needs the content string.

Extract it from choices[0].message.content,
wrap it in a simple JSON object,
and send it with res.json().

The property name you choose here
is what the frontend will look for.
