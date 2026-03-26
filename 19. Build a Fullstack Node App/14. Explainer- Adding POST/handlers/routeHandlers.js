import { getData } from '../utils/getData.js'
import { sendResponse } from '../utils/sendResponse.js'

export async function handleGet(res) {
  const data = await getData()
  const content = JSON.stringify(data)
  sendResponse(res, 200, 'application/json', content)
}  

// handlePost

/*
Challenge:
  1. Create and export a function called handlePost().
  2. For now, that function can just log 'POST request received'.
*/

export async function handlePost(req, res) {
  console.log('POST request received')
}
