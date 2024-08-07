const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const passport_local = require('./confige/passport')
const path = require('path');

const app = express();

const port = 8000;

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'./pages'));
app.use(express.urlencoded());
app.use(express.static('assets'));
app.use(cookieParser());

app.use(session({
    name:'urmit',
    secret:'codeadmin',
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:10000*60*60
    }
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://Admin:1kGijXVOaLC58W5j@carsassignment.30nc1.mongodb.net/?retryWrites=true&w=majority&appName=carsAssignment').then(()=>{
    console.log('Database connected');
}).catch((err)=>{
    console.log(err);
});

app.use('/', require('./routes/admin/adminRouter'));
app.use('/user', require('./routes/user/userRouter'));
app.listen(port,(err)=>{
    try {
        if(err){
            console.log(err);
        }
        console.log(`Server is running on port ${port}`);
    } catch (error) {
        console.log(error);
    }
});
