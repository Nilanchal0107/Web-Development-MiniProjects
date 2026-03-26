import { getData } from '../utils/getData.js'
import { sendResponse } from '../utils/sendResponse.js'
import { parseJSONBody } from '../utils/parseJSONBody.js'
import { addNewSighting } from '../utils/addNewSighting.js'
import { sanitizeInput } from '../utils/sanitizeInput.js'
import { sightingEvents } from '../events/sightingEvents.js'

export async function handleGet(res) { 
  const data = await getData()
  const content = JSON.stringify(data)
  sendResponse(res, 200, 'application/json', content)
}

export async function handlePost(req, res) {

  try {
    const parsedBody = await parseJSONBody(req)
    const sanitizedBody = sanitizeInput(parsedBody)
    await addNewSighting(sanitizedBody)
    sightingEvents.emit('sighting-added', sanitizedBody)
/*
Challenge 2
1. At the top of this file, import the event emitter you have created.
2. Use it to emit a ‘sighting-added’ event. 
   What information does the listener function need?
3. Add a sighting to test!
*/

    sendResponse(res, 201, 'application/json', JSON.stringify(sanitizedBody))
  } catch (err) {
    sendResponse(res, 400, 'application/json', JSON.stringify({ error: err }))
  }

}


