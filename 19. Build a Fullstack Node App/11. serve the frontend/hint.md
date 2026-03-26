1. To keep things neat, create a path to the 'public' folder.
2. Use a ternary to get the path to the file to serve (remember, a request to '/' is a request for index.html).
3. Get the extension from path's extname() method.
4. Use the extension to get the Content-Type from getContentType(). 
5. Pass sendResponse() the correct content-contentType.
6. Test.