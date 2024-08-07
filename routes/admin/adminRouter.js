const express = require('express');
const router = express.Router();
const passport = require('passport');

const adminController = require('../../controller/admin/adminController');

router.get('/',adminController.login);

router.post('/loginCheck',passport.authenticate('admin-local', { failureRedirect: '/' }), adminController.loginCheck);

router.get('/homepage',passport.checkauthenticat,adminController.dashboard);

router.get('/listCar',passport.checkauthenticat,adminController.listCar);

router.post('/addCar',passport.checkauthenticat, adminController.addCar);

router.get('/viewListing',passport.checkauthenticat, adminController.viewListing);

router.get("/removeProduct/:id",passport.checkauthenticat, adminController.removeProduct);

router.get("/updateProduct/:id",passport.checkauthenticat, adminController.updateProduct);

router.post('/editProduct',passport.checkauthenticat, adminController.editProduct);

module.exports = router
