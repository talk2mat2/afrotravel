const localstrategy= require('passport-local').Strategy;
const bcrypt= require('bcrypt');
const userSchema = require('../model/users')

async function initialize(passport){
    const authenticateUser= async (email,password,done)=>{
    const lowercaseemail = email.toLowerCase()
    const user= await userSchema.findOne({email:lowercaseemail})
    if(!user){return done(null,false,{message:'user with account not found'})}
    try{
        if ( await bcrypt.compare(password,user.password )){
            return done(null, user)
                } else{ return done(null,false,{message:'password is wrong'})}
    }
    catch(e){return done(e)} 
    }   
    passport.use(new localstrategy({usernameField:'email'},authenticateUser))
    passport.serializeUser((user,done)=>done (null,user.id))

    passport.deserializeUser(async function(id, done) {
       await userSchema.findById(id, function(err, user) {
          return done(err, user);
        });
      });
    // passport.deserializeUser((id,done)=>{return done(null,getUserById(id)) })
}




module.exports=initialize