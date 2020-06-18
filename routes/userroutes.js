const express = require('express')
const router = express.Router()
const {getregisterform,getloginform,registerUser,loginuser,getmyprofile,geteditmyprofile}= require('../controller/userscontroll')
const multer =  require('multer')
const path = require('path')
const User= require('../model/users')



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/image/uploads/profilepics')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + req.user.id+ path.extname(file.originalname))
  }
})


const fileFilter = (req,file,cb) => {
  if(file.mimetype === "image/jpg"  || 
     file.mimetype ==="image/jpeg"  || 
     file.mimetype ===  "image/png"){
   
  cb(null, true);
 }else{
    cb(null,false);
}
}
const upload = multer({storage: storage, fileFilter : fileFilter})



router.get('/register',getregisterform)

router.get('/login',getloginform)
router.post('/register',registerUser)

router.post('/login',
  loginuser);
router.get('/profile',getmyprofile)  
router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });
router.get('/profile/edit',geteditmyprofile)
router.post('/profile/edit',upload.single('profilepicture'),
async function(req,res,next){

  
  
  const file= req.file
  const filter= {_id:req.user.id}; 


  if(!file && req.user){
  const {aboutme,firstname,lastname,location,phoneno,sex}= req.body;
 
   await User.findOneAndUpdate(filter,
    {aboutme,firstname,lastname,location,phoneno,sex},{new:true,useFindAndModify: false})
   
 
   req.flash('successMessage','updated successfully')
   res.redirect('/profile')
  }else if (file && req.user){
  const profilepicture= '/image/uploads/profilepics/'+req.file.filename;
  
  const {aboutme,firstname,lastname,location,phoneno,sex}= req.body;
  
   await User.findOneAndUpdate(filter,
    {aboutme,firstname,lastname,location,phoneno,sex,profilepicture},{new:true,useFindAndModify: false});
   
  
   req.flash('successMessage','updated successfully');
   res.redirect('/profile')
}else{req.flash('errorMessage','login to continue')
res.redirect('/login')}
  
} )



module.exports = router