const countryschema = require('../model/country')
const shortid= require('shortid')
const bookingSchema = require('../model/bookings')



exports.getcountry= async function(req,res){
 const countrylist = await countryschema.find({});
 res.render('index',{countrylist:countrylist,user:req.user})
 
 
}
exports.getaboutpage= function(req,res){
    res.render('about',{user:req.user})
}
// exports.postpicture= async function(req,res){
//     const newItem = new countryschema()

// }

exports.getcountrydetail= async function(req,res){
    const id=req.params.id
    await countryschema.find({_id:id}).then((success)=>{
     
       
 res.status(200).render('countrydetail',{user:req.user,post:success,successMessage:req.flash('successMessage')
 ,errorMessage:req.flash('errorMessage')})
     },(err)=>{res.redirect('/')})
 }

 exports.getbookingform= async function(req,res){
    if(req.user){
        const id= req.params.id
        await countryschema.find({_id:id}).then((success)=>{
             res.render('bookingform',{post:success,user:req.user,successMessage:req.flash('successMessage')
      ,errorMessage:req.flash('errorMessage')})
        },(err)=>{
            req.flash('errorMessage','not found')
            res.redirect('/')})
    } else{req.flash('errorMessage','login or signup to continue')
        res.redirect('/login')}
    
   
  }

  exports.postbookingform= async function(req,res){
    
    const id= req.params.id;
    const bookedby = req.user.email;
    const bookedbyname = req.user.firstname+" "+req.user.lastname;
    const {travelduration,numberoftravlers,description}= req.body
    const randomtoken = shortid.generate()
    await countryschema.find({_id:id}).then(async (success)=>{
//          res.render('bookingform',{post:success,user:req.user,successMessage:req.flash('successMessage')
//   ,errorMessage:req.flash('errorMessage')})
const newbooking= new bookingSchema({bookedbyname,country:success[0].country,bookedby,travelduration,numberoftravlers,description,randomtoken,id})
console.log(bookedbyname,success[0].country,bookedby,travelduration,numberoftravlers,description,randomtoken,id)
await newbooking.save()
    },(err)=>{
        req.flash('errorMessage','not found')
        res.redirect('/')})
  
 }
