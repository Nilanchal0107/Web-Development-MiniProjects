import { getData } from '../utils/getData.js'
import { sendResponse } from '../utils/sendResponse.js'
import { parseJSONBody } from '../utils/parseJSONBody.js'

export async function handleGet(res) {
  const data = await getData()
  const content = JSON.stringify(data)
  sendResponse(res, 200, 'application/json', content)
}  

export async function handlePost(req, res) {

  const rawBody = await parseJSONBody(req)
  console.log(rawBody)
/*
Challenge 2:
  1. Create a const 'rawBody' to store whatever is returned by parseJSONBody()
  2. For now, log 'rawBody'.
  3. Input an entry on the front end to test.
*/

} 

// santizeData() 
// addNewSighting() will do the donkey work of adding the data to our dataset
// sendResponse()


