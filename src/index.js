const express = require('express')
const path = require('path')

const app = express()

const port = process.env.PORT || 4999
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

app.listen(port, () => {
  console.log(`Server is running at port ${port}`)
})