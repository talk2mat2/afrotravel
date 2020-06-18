const express = require('express');
const router= express.Router()
const fs = require('fs');
const {getcountry,getaboutpage,getcountrydetail,getbookingform,postbookingform}= require('../controller/countrycontroll')
const multer =  require('multer')
const path = require('path')
const countryschema = require('../model/country')



router.get('/',getcountry)
router.get('/aboutus',getaboutpage)
router.get('/country/:id',getcountrydetail)
router.get('/book/:id',getbookingform)
router.post('/book/:id',postbookingform)


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/image/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname))
    }
  })


  const fileFilter = (req,file,cb) => {
    if(file.mimetype === "image/jpg"  || 
       file.mimetype ==="image/jpeg"  || 
       file.mimetype ===  "image/png"){
     
    cb(null, true);
   }else{
      cb(new Error("Image uploaded is not of type jpg/jpeg or png"),false);
}
}
const upload = multer({storage: storage, fileFilter : fileFilter})

router.post('/country', upload.single('images'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    const {country,price}= req.body;
    const images= '/image/uploads/'+req.file.filename;
    
    const newcountryschema= new countryschema({country,price,images})
    newcountryschema.save().catch(e=>{ console.log(e);
        res.status(501).send({message:"error"})})
        res.status(200).send({message:"saved"})
       
  })










module.exports= router
