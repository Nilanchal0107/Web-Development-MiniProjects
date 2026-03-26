You will need these, but with which header do they go with?

  "no-cache"
  text/event-stream"
  "keep-alive"

Here's an example string with an object, but you need to stringify the object!

  `data: {
    event: "new-update",
    story: stories[randomIndex],
  }\n\n`

