const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const shortid = require('shortid');

const bookingSchema = new Schema({
    destination:{type:String, required:true},
    email:{type:String, required:true},
bookedbyname:{type:String, required:true},
    travelduration:{type:String, required:true},
    numberoftravlers: {
        type: String,
       required:true
      },
    bookingdate:{type:Date,default:Date.now},
    phoneno:{type:String},
    description:{type:String},
    randomtoken: {
        type: String,required:true,unique:true
      }

})


module.exports= mongoose.model('travelbookings',bookingSchema);