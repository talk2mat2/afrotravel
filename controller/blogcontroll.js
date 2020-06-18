const blogSchema = require('../model/blogmodel');
const commentsschema= require('../model/commentsmodel')


exports.createpost=async function(req,res){
    const {topic,message,names}= req.body;
    
    if (!topic|| !message|| !names){
        req.flash('errorMessage','all values are required')
        res.status(501).redirect('/blog')
    }
    else{
       
        const newPost= blogSchema({topic,message,names})

       await newPost.save((success)=>{
req.flash('successMessage','successfully posted')
res.status(200).redirect('/blog')
       },(err)=>{console.log(err)})
    }
}

exports.getblogpage= async function(req,res){
  
    await blogSchema.find({}).then((success)=>{
      
res.status(200).render('blog',{user:req.user,post:success,successMessage:req.flash('successMessage')
,errorMessage:req.flash('errorMessage')})
    })
}

exports.getpostdetail= async function(req,res){
   const id=req.params.id
   const commentsdata=  await commentsschema.find({forblogpost:`${id}`});
  
    await blogSchema.find({_id:id}).then((success)=>{
    
      
res.status(200).render('postdetail',{user:req.user,post:success,commentsdata:commentsdata,successMessage:req.flash('successMessage')
,errorMessage:req.flash('errorMessage')})
    })
}

exports.getnewpost= async function(req,res){
    res.status(200).render('newpost',{user:req.user,successMessage:req.flash('successMessage') }) 
}


exports.commentspost= async function(req,res){
    const comments=req.body.comments;
    const forblogpost= req.params.id;
    const postedby = req.body.user;
   
    const idpost = await blogSchema.findById(forblogpost);
    const newcomment ={comments,forblogpost:`${idpost._id}`,postedby:postedby}
    
    idpost.comments.push(newcomment)
    idpost.save().catch(e=>{
        console.log(e);
        
    })
    
    // const newcomment = new commentsschema({comments,forblogpost:`${idpost._id}`})
    // await newcomment.save()
    req.flash('successMessage','your reply was posted')
    res.redirect('/blog/'+forblogpost)
    

}