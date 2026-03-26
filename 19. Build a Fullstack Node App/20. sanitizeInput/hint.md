Bring in the sanitize-html dependency


Set up a utility function to sanitize incoming data.


Our incoming data is an object.


Iterate over that object and sanitize any strings. Remember to allow the '<b>' tag.


One way to iterate over an object:
  for (const [key, value] of Object.entries(objName)) {
   // do something here
  }


Our function should return the sanitized data.


Probably best to call this function in handlePost()
