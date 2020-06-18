const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');

const blogSchema = new Schema({
    topic:{type:String, required:true},
    message:{type:String, required:true},
    names:{type:String, required:true},
    _id: {
        'type': String,
        'default': shortid.generate,
      },
    comments:[{type:Object}]


})


module.exports= mongoose.model('blog',blogSchema);