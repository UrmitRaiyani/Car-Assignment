const express= require('express');

const router = express.Router();
const passport = require('passport');

const userController = require('../../controller/user/userController')

router.get('/',userController.login);
router.post('/checkLogin',passport.authenticate('user-local', { failureRedirect: '/user' }), userController.checkLogin);
router.get('/home',passport.userCheckauthenticat, userController.home);

module.exports = router