const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require('./config/key');

const { User } = require("./models/User");

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false
}).then(() => console.log('MongoDB connected...')).catch(err => console.log(err))

app.get('/',(req,res) => res.send('hellooooo World!'))
app.post('/register',(req,res)=>{
    const user = new User(req.body);
    user.save((err,userInfo) => {
        if(err) return res.json({ success: false, err})
        return res.status(200).json({
            success: true
        })
    })
})

app.post('/login',(req,res) => {
    //요청된 이메일이 데이터베이스에 있는지 확인
    User.findOne({ email: req.body.email }, (err, user) => {
        if(!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }
        //요청된 이메일의 비밀번호와 사용자가 입력한 비밀번호가 일치하는지 확인
        user.comparePassword(req.body.password,(err, isMatch) => {
            if(!isMatch){
                return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다"})
            }
            //비밀번호가 맞다면 토큰 생성
            user.generateToken((err,user) => {
                if(err) return res.status(400).send(err);
                // 토큰을 저장한다. 어디에 ? 쿠키, 로컬 스토리지... 이번에는 쿠키에 저장해볼게요
                //x_auth 라는 이름으로 쿠키에 토큰을 저장함
                res.cookie("x_auth",user.token).status(200).json({loginSuccess:true,userId:user._id})
            })  
        })
    })
})

app.listen(port,()=>console.log(`Example app listening on port ${port}!`))

// mongodb+srv://hyesoo:<password>@boilerplate.a5yew.mongodb.net/<dbname>?retryWrites=true&w=majority