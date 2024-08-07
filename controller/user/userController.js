const product = require('../../model/car');
const user = require('../../model/user');
const notifier = require('node-notifier'); 

module.exports.home = async (req,res) =>{

    const cars = await product.find({});
    if(cars){
       return res.render('user/viewCars', {cars: cars});
    }
    else{
        return res.redirect('back');
    }
    
}

module.exports.login = async (req,res) =>{
    
    try {
        if (req.isAuthenticated()) {
            return res.redirect('home');
        }
        else {
            return res.render('user/login', { layout: 'login' });
        }

    } catch (error) {
        console.log(error);
    }
}


module.exports.checkLogin = async (req, res) =>{
    notifier.notify({
        title: 'success',
        message: 'Login successfully',
        sound: true,
        wait: true
      })
    return  res.redirect('home');
}