const express = require('express')
var cors = require('cors')
const app = express()
app.use(cors())

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/events', function (err, db) {
  if (err) {
    throw err;
  }
});


app.get('/', (req, res) => {
  res.send('Hello World!')
  res.status(200).json({
    data: []
  });
})

app.post('/', (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: 'Objet créé !',
    data: []
  });
});


const port = 5000
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})