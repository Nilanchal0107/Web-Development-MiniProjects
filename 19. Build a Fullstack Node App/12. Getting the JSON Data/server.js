import http from 'node:http'
import { serveStatic } from './utils/serveStatic.js'
import { getData } from './utils/getData.js'

const PORT = 8000

const __dirname = import.meta.dirname

const server = http.createServer(async (req, res) => {


    await serveStatic(req, res, __dirname)
}) 

server.listen(PORT, ()=> console.log(`Connected on port: ${PORT}`))
 