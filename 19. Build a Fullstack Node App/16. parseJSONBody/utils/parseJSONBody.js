/*
Challenge 1:
  1. Create a function parseJSONBody which:
    - gathers the incoming chunks into a string 'body'.
    - parses 'body'
    - returns 'body'
    - throws an error if 'body' can't be parsed:
        `Invalid JSON format: ${err}`
*/

export async function parseJSONBody(req) {
  let body = '';
  for await (const chunk of req) {
    body += chunk;
  }
  try {
    return JSON.parse(body);
  } catch (err) {
    throw new Error(`Invalid JSON format: ${err}`);
  }
}