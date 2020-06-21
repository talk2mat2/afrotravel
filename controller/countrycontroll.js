const countryschema = require('../model/country')
const shortid= require('shortid')
const bookingSchema = require('../model/bookings')
const Users= require('../model/users')



exports.getcountry= async function(req,res){
 const countrylist = await countryschema.find({});
 res.render('index',{countrylist:countrylist,user:req.user,successMessage:req.flash('successMessage')
 ,errorMessage:req.flash('errorMessage')})
 
 
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
    const email = req.user.email;
    const bookedbyname = req.user.firstname+" "+req.user.lastname;
    const {travelduration,numberoftravlers,description}= req.body
    const randomtoken = shortid.generate()
    const phoneno = req.user.phoneno
   
    await countryschema.find({_id:id}).then(async (success)=>{
        const country = success[0].country
        const price= success[0].price
        console.log(price,country)
       
//          res.render('bookingform',{post:success,user:req.user,successMessage:req.flash('successMessage')
//   ,errorMessage:req.flash('errorMessage')})
const newbooking= new bookingSchema({phoneno,bookedbyname,destination:country,email,travelduration,numberoftravlers,description,randomtoken,id})
const newUsertravels =await Users.findOne({_id:req.user.id}).catch(err=>{res.redirect('/')})

await newUsertravels.bookinghistory.push({destination_id:success[0].id,country:country,booking_id:randomtoken})
// console.log(bookedbyname,success[0].country,email,travelduration,numberoftravlers,description,randomtoken,id)
res.render('successbooked',{randomtoken:randomtoken,country:country,price:price,user:req.user,successMessage:req.flash('successMessage')
,errorMessage:req.flash('errorMessage')})
await newUsertravels.save()
await newbooking.save().catch(err=>{
    res.redirect('/')
    console.log(err)})
    },(err)=>{
        req.flash('errorMessage','not found')
        res.redirect('/')})
  
 }


 exports.getcontactusform=async function(req,res){
     res.render('contactus',{user:req.user,successMessage:req.flash('successMessage')
     ,errorMessage:req.flash('errorMessage')})
 }