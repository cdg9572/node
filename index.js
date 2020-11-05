const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://cdg9572:dogyu9572@cdg9572.pieth.mongodb.net/cdg9572?retryWrites=true&w=majority', {
    useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex : true, useFindAndModify : false
}).then(() => console.log('MoongDB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!ㅋㅋㅋㅋsss')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

