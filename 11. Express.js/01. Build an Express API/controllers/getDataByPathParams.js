import { startups } from '../data/data.js'

export const getDataByPathParams = (req, res) => {

  const { field, term } = req.params

  const allowedFields = ['country', 'continent', 'industry']

  if (!allowedFields.includes(field)) {
    return res.status(400).json({ message: "Search field not allowed. Please use only country, continent, industry" })
  }

  const filteredData = startups.filter(
    startup => startup[field].toLowerCase() === term.toLowerCase()
  )

  if (filteredData.length === 0) {
    return res.status(404).json({ message: "No startup found matching the criteria." })
  }

  res.json(filteredData)
}