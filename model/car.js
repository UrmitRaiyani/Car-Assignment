const mongoose = require('mongoose');
const AVATAR_PATH = '/uploads';
const path = require('path');
const multer = require('multer');

const carSchema = new mongoose.Schema({
    carName: { type: String, required: true },
    price: { type: Number, required: true },
    year: { type: Number, required: true },
    // avatar: { type: String, required: true }
},
{
    timestamps: true
}); 

// const storage = multer.diskStorage({
//     destination : function(req,file,cb){
//         cb(null,path.join(__dirname,'../../',AVATAR_PATH))
//     },
//     filename : function(req,file,cb){
//         cb(null,file.fieldname+'-'+Date.now())
//     }
// })

// car.statics.uploadedAvatar = multer({storage:storage}).single('avatar');
// car.statics.avatarPath = AVATAR_PATH;

module.exports = mongoose.model('Car', carSchema);