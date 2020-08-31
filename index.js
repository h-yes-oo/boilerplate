const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require('./config/key');
const { auth } = require("./middleware/auth");
const { User } = require("./models/User");

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false
}).then(() => console.log('MongoDB connected...')).catch(err => console.log(err))

app.get('/',(req,res) => res.send('hellooooo World!'))
app.post('/api/users/register',(req,res)=>{
    const user = new User(req.body);
    user.save((err,userInfo) => {
        if(err) return res.json({ success: false, err})
        return res.status(200).json({
            success: true
        })
    })
})

app.post('/api/users/login',(req,res) => {
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

app.get('/api/users/auth', auth , (req,res) => {
    //여기까지 미들웨어를 통과해 왔다는 것은, Authentication이 True라는 의미
    res.status(200).json({
        _id: req.user._id,
        //role이 0이면 일반 유저이고, 0이 아니면 관리자라고 규칙을 정했을 때
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        emil: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
})

app.get('/api/users/logout', auth, (req,res) => {
    User.findOneAndUpdate({_id: req.user._id},
        { token: "" },
        (err, user) => {
            if(err) return res.json({success: false, err})
            return res.status(200).send({
                success: true
            })
        })
})


app.listen(port,()=>console.log(`Example app listening on port ${port}!`))