import http from 'node:http'
import { serveStatic } from './utils/serveStatic.js'
import { handleGet } from './handlers/routeHandlers.js'

const PORT = 8000

const __dirname = import.meta.dirname

const server = http.createServer(async (req, res) => {
/*
Challenge: 
   1. Set up a route for ‘/api’.
   2. Nest an if to check if the method is ‘GET’. 
   3. When a GET request is received to '/api', use handleGet() to handle it.
*/ 
    if(req.url === '/api') {
        if(req.method === 'GET') {
            return await handleGet(res)
        }
    }
    else if (!req.url.startsWith('/api')) {
        return await serveStatic(req, res, __dirname) 
    }
}) 

server.listen(PORT, ()=> console.log(`Connected on port: ${PORT}`))
 