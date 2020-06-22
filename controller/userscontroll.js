const Users= require('../model/users')
const bcrypt = require('bcrypt');
const passport = require('passport')
const initialize= require('../middleware/passport')




initialize(passport)










exports.getregisterform= function(req,res){
    if(!req.user){
    
    res.render('register',{user:req.user,errorMessage:req.flash('errorMessage'),successMessage:req.flash('successMessage')})
}else{
    req.flash('errorMessage','you are already logged in')
    res.redirect('/')}
}

exports.loginuser= passport.authenticate('local', { 
failureRedirect: '/login',
failureFlash: true })
exports.redirectuser= function(req,res){

     req.flash('successMessage',`welcome back ${req.user.firstname}`)
    res.redirect('/')
    // req.flash(`successMessage','welcome boss, ${req.user.firstname}`)
    
    // res.redirect('/')
}




exports.getloginform= (req,res)=>{
    if(req.user){res.redirect('/')}
    else{res.render('login',{user:req.user,successMessage:req.flash('successMessage'),
    errorMessage:req.flash('errorMessage')})}
   
}



exports.registerUser= async function(req,res){
    const{email,password,password2,firstname,lastname,sex}= req.body;
 
    if(!email||!password||!firstname||!lastname||!sex){
        req.flash('errorMessage','you didnt fill  the required values ');
        res.status(501).render('register',{user:req.user,successMessage:req.flash('successMessage'),errorMessage:req.flash('errorMessage')})
        
    }
    else if(password!=password2){
        req.flash('errorMessage','the two password are not the same');
        res.status(501).render('register',{user:req.user,successMessage:req.flash('successMessage'),
        errorMessage:req.flash('errorMessage')})
     }
     else if(password.length<5){
        req.flash('errorMessage','your password length should be 6 or above');
        res.status(501).render('register',{user:req.user,successMessage:req.flash('successMessage'),
        errorMessage:req.flash('errorMessage')})
     }

   else if ( await Users.findOne({email:email})){
    req.flash('errorMessage',`user with email ${email} exist, ,login pls`);
    res.status(501).render('register',{user:req.user,successMessage:req.flash('successMessage'),
    errorMessage:req.flash('errorMessage')})
   }
   else{ 
       const harshpassword=await bcrypt.hash(password,10)
       const newUser = new Users({email,password:harshpassword,firstname,lastname,sex})
await newUser.save().then((success)=>{
req.login(newUser,function(err){
    if(err){
        console.log(err)
    }
    else{
        req.flash('successMessage','account created successfully');
        req.flash('successMessage','a mail has been sent to you')
        req.flash('successMessage',`---you are logged in as ${firstname}`)
    res.status(501).redirect('/')
    }
})

  

    
   
})}
    


}



exports.getmyprofile= async function(req,res){
    
if (req.user){
    await Users.findOne({_id:req.user.id}).then((success)=>{
       
        res.render('profile',{user:success,errorMessage:req.flash('errorMessage'),successMessage:req.flash('successMessage')})
     
     
     } 
     
     )
}
else{
    req.flash('errorMessage','you must login in to access this')
    res.redirect('/login')
}
}
exports.geteditmyprofile= async function(req,res){
    if(req.user){
    res.render('editprofile',{user:req.user,successMessage:req.flash('successMessage'),
    errorMessage:req.flash('errorMessage')})}
    else{
        req.flash('errorMessage','log in to continue');
        res.redirect('/login')
    }
}
// exports.posteditmyprofile= 