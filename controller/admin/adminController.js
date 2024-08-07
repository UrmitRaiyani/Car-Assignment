const Admin = require('../../model/admin');
const car = require('../../model/car');
const listCar = require('../../model/car');
const notifier = require('node-notifier'); 


const nDate = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Calcutta'
  })
module.exports.login = (req, res) => {
    try {
        if (req.isAuthenticated()) {
            return res.redirect('/homepage');
        }
        else {
            return res.render('admin/login', { layout: 'login' });
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports.loginCheck = async (req, res) => { 
    return res.redirect('/homepage');
}

module.exports.dashboard = (req,res) => {
    return res.render('admin/homepage');
}

module.exports.listCar = (req, res) => {
    return res.render('admin/listCar');
}

module.exports.addCar =async (req, res) => {
    // return res.render('admin/addCar')
    try {
        let imagePath = '';
        if(req.file){
            imagePath = car.avatarPath+"/"+req.file.filename;
        }
        req.body.avatar = imagePath;
        req.body.createdAt = nDate;
        req.body.updatedAt = nDate;
        let carData = await car.create(req.body);
        if(carData)
        {
            notifier.notify({
                title: 'Done',
                message: 'car Added successfully',
                sound: true,
                wait: true
              })
            return res.redirect('back');
        }
        {
            notifier.notify({
                title: 'hmmmm!',
                message: 'Car is not added',
                sound: true,
                wait: true
              })
            return res.redirect('back');
        }
           
        
    } catch (error) {
        console.log(error);
    }
}

module.exports.viewListing = async (req,res) => {
  

    let carData = await car.find({});
  
    if(carData)
    {
        return res.render('admin/viewListing', {'carData':carData});
    }
    else
    {
        return res.redirect('back');
    }
}

module.exports.removeProduct = async (req, res) => {
   
    let Product = await car.findByIdAndDelete(req.params.id);

    if (Product) {
     
        notifier.notify({
            title: 'success',
            message: 'Product Deleted',
            sound: true,
            wait: true
          })
        return res.redirect('back');

    }
    else {
        return res.redirect('back');
    }
}

module.exports.updateProduct = async (req, res) => {
    let Product = await car.findById(req.params.id);
    if (Product) {
        return res.render('admin/updateproduct', { 'Product': Product });
    }
    else {
        return res.redirect('back');
    }
}

module.exports.editProduct = async (req, res) => {
    try {
        let id = req.body.editid;
        if(id)
        {
            let listingData = await car.findByIdAndUpdate(id, req.body);
            if(listingData)
            {
                notifier.notify({
                    title: 'Success',
                    message: 'product updated successfully',
                    sound: true,
                    wait: true
                  })
                return res.redirect('/viewListing');
            }
            else{
                return res.redirect('back');
            }
        }
        else {
            return res.redirect('back');
        }
    } catch (error) {
        console.log(error);
    }
}