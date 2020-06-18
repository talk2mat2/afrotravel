const mongoose = require('mongoose');
const Schema = mongoose.Schema;




const countryschema = new Schema(
    {
      country : {type:String,required:true},
      images:{
        type:String,
        
        },
      price:{type:Number, required:true}
      
    }
   
);



module.exports = mongoose.model('country', countryschema)