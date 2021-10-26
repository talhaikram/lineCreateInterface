const express = require('express')
const path = require('path')
const app = express()
// const test = require('./test')
const port = 3300
app.use('/static',express.static(path.join(__dirname, 'js')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
  // res.sendFile(__dirname + './test.js');
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})