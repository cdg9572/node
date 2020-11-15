const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

//config폴더 연결값
const config = require('./config/key');

const { User } = require("./models/User");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));//클라이언트 정보를 가져와서 서버에 저장

//application/json
app.use(bodyParser.json());

app.use(cookieParser());

//DB커넥션하기
const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
    useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex : true, useFindAndModify : false
}).then(() => console.log('MoongDB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!bbb222')
})

app.post('/register', (req, res) => {
  //DB에 데이터 넣기
  const user = new User(req.body)  //body를 모델에 넣음

  user.save((err, userInfo) => {
    if (err) return res.json({ success : false, err })  // 에러가 있으면 json 형식으로 메시지와 함께전달
    return res.status(200).json({  //성공했으면 json 형식으로 정보 전달
      success: true
    })
  })
})

app.post('login', (req, res) =>{

  // 요청된 이메일을 데이터 비이스에 있는지 찾는다.
  User.findOne({ email : req.body.email }, (err, userInfo) => {
    if(!user){
      return res.json({
        loginSucess : false,
        message : "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }
 
    // 요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호 인지확인
    user.comparePassword(req.body.Password, (err, isMatch) => {
      if(!isMatch)
      return res.json({ loginSucess : false, message : "비밀번호가 틀렸습니다."})

      // 비밀번호까지 맞다면 토큰을 생성하기
      user.generateToken((err, user) =>{
        if(err) return res.status(400).send(err);
        // 토큰을 저장한다. 어디에? 쿠키, 로컬스토리지
        res.cookie("x_auth" , user.token )
        .status(200)
        .json({loginSuccess: true, userId: user._id})        
      })
    }) 
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

