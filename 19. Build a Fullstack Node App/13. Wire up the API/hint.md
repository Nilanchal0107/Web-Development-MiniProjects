Use a try/catch and make sure the function is an async function.

The encoding should be 'utf8' (this ensures we get a string).

You can parse the data with JSON.parse().

Even if there’s an error, it will be useful if this function returns the same data type as it would return if it had been successful. When we give JSON.parse() our JSON string, what JS object type does it give us?
