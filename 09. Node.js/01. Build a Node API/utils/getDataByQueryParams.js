export const sendJSONResponse = (res, statusCode, payload) => {
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*') // allow access from any domain
    res.setHeader('Access-Control-Allow-Methods', 'GET') // GET method only
    res.statusCode = statusCode
    res.end(JSON.stringify(payload))
}