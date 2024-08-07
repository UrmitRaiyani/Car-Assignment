const Admin = require("../model/admin");
const User = require("../model/user");

const passport = require("passport");

const passportLocal = require('passport-local').Strategy;

passport.use('admin-local',new passportLocal({
    usernameField: 'email'
}, async function (email, password, done) {
    let admin = await Admin.findOne({ email: email });

    if (!admin || admin.password != password) {
        return done(null, false);
    }
    return done(null, admin);
}))

passport.use('user-local',new passportLocal({
    usernameField: 'email'
}, async function (email, password, done) {
    let Userdata = await User.findOne({ email: email });

    if (!Userdata || Userdata.password != password) {
        return done(null, false);
    }
    return done(null, Userdata);
}))


passport.serializeUser(function (admin, done) {
    return done(null, admin.id);
})

passport.deserializeUser(async function (id, done) {
    let AdminData = await Admin.findById(id);
    if (AdminData) {
        return done(null, AdminData);
    }
    else {
        let Userdata = await User.findById(id)
        if(Userdata){
            return done(null, Userdata);
        }
        else{

            return done(null, false);
        }
    }
})

passport.checkauthenticat = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    }
    else
    {
        return res.redirect('/');
    }
    
}

passport.userCheckauthenticat = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    }
    else
    {
        return res.redirect('/user');
    }
    
}

module.exports = passport;
