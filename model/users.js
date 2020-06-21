const mongoose = require('mongoose');
const Schema =  mongoose.Schema



const userSchema = new Schema({
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    sex:{type:String},
    phoneno:{type:String},
    location:{type:String},
    profilepicture:{type:String,default:"/image/uploads/profilepics/avatar.jpg"},
    aboutme:{type:String},
    bookinghistory:[{type:Object}],
    admin_status:{type:Boolean,default:false}
});

module.exports= mongoose.model('user',userSchema)