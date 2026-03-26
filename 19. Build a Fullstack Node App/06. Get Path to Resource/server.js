import http from 'node:http'
import { serveStatic } from './utils/serveStatic.js'

const PORT = 8000

/*
Challenge 1:

1. Get the name of the directory holding this server.js file and store it to a const ‘__dirname’.
*/

const __dirname = import.meta.dirname


const server = http.createServer((req, res) => {

/*
Challenge 3:

1. Import and call serveStatic and pass it the directory of this current module.
*/
    serveStatic(__dirname)
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.end('<html><h1>The server is working</h1></html>')
})

server.listen(PORT, ()=> console.log(`Connected on port: ${PORT}`))
