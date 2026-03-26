Iterate over the req. 
For each chunk of streamed data, build up the body as a string.
Remember to await each chunk!

In a try catch, call JSON.parse on the body. 
You can throw an error using the 'throw' and 'new' keywords:
    throw new Error(`my error text`)



