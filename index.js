const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');

const config = require('./config/key');

const { User } = require("./models/User");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));//z클라이언트 정보를 가져와서 서버에 저장
//application/json
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
    useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex : true, useFindAndModify : false
}).then(() => console.log('MoongDB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!bbb')
})

app.post('/register', (req, res) => {
  //DB에 데이터 넣기
  const user = new User(req.body)
 
  

  user.save((err, userInfo) => {
    if (err) return res.json({ success : false, err })  // 에러가 있으면 json 형식으로 메시지와 함께전달
    return res.status(200).json({  //성공했으면 json 형식으로 정보 전달
      success: true
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

