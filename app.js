const express = require('express');
const app =express()
const connection = require('./db/connection')
const multer = require('multer')
const path = require('path')
const countryroutes = require('./routes/countryroutes')
const userroutes = require('./routes/userroutes');
const session = require('express-session')
const flash = require('express-flash');
const passport = require('passport')
const initializepassport = require('./middleware/passport')
const blogroutes= require('./routes/blogroute');

 

connection()







app.set('trust proxy', 1)
app.use(flash())
app.use(session({secret:'doggy',resave:false,saveUninitialized:true,cookie:{
    secure: false,
    maxAge:(40 * 60 * 1000),signed:true
       }}));


app.use(passport.initialize())
app.use(passport.session())



app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:false}));
app.use(express.json({extended:false}));
app.use(userroutes)
app.use(countryroutes)
app.use(blogroutes)



app.use(function(req, res, next){
    res.status(404);
  
    // respond with html page
    if (req.accepts('html')) {
      res.render('404', { url: req.url ,user:req.user,successMessage:req.flash('successMessage'),
      errorMessage:req.flash('errorMessage')});
      return;
    }
  
    // respond with json
    if (req.accepts('json')) {
      res.send({ error: 'Not found' });
      return;
    }
  
    // default to plain-text. send()
    res.type('txt').send('Not found');
  });



const port = process.env.PORT || 8080
app.listen(port,()=>(console.log(`server runinng on port ${port}`)));