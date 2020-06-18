const mongoose = require('mongoose');
const Schema = mongoose.Schema;




const commentsschema = new Schema(
    {
      comments : {type:String,required:true},
      forblogpost : {type:String,required:true},
      // forblogpost:{type:Schema.Types.ObjectId, ref: 'blogs' },
     
      
    }
   
);



module.exports = mongoose.model('comments', commentsschema)