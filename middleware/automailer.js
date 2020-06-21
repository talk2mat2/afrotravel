const mailSchema = require('../model/maillist');
const fetch= require('node-fetch')

const nodeMailer = require('nodemailer');



exports.welcomemail= async function (email,username) {
  
    
    

    let transporter = nodeMailer.createTransport({
        maxConnections: 3,
   pool: true,        
        host: "smtp-mail.outlook.com",
        secureConnection: false,
        port: 587,
        tls: {
            ciphers:'SSLv3'
            },
        requireTLS:true,
        auth: {
            // sender's account
            user: 'talk2mat7@outlook.com',
            pass: 'chibuzo1'
        }
    });
    let mailOptions = {
        
        // // should be replaced with real recipient's account
        // to: 'talk2martins2@gmail.com',
        // subject: "testing",
        // // req.body.subject,
        // text:"testing covid19 y"
        // //  req.body.message
        from: '"COVID-19 update " <talk2mat7@outlook.com>', // sender address (who sends)
    to: email, // list of receivers (who receives)
    subject: `welcome to covid 19 updates app ${username}`, // Subject line
    text: `welcome to covid 19 updates app ${username}`, // plaintext body
    html: `<p>hello ${username }<br/>we are pleased to welcome you to this great app<br/> here you can see latest update for the current corona virus deases pandemic,<br/> you can also subscribe for alerts too </p>`
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
    
  };    
  
 









const sendmail= async function (email,country) {
  
    const apiurlng= `https://api.covid19api.com/total/country/${country}`
  
    const data1= await fetch(apiurlng);
    const json1= await data1.json();
    const jsonstring= await json1[json1.length-1]
    const COUNT=country;
    const Deaths= jsonstring.Deaths;
    const Confirmed= jsonstring.Confirmed;
    const Recovered= jsonstring.Recovered;
    const Active= jsonstring.Active;

    let transporter = nodeMailer.createTransport({
        maxConnections: 3, 
   pool: true,        
        host: "smtp-mail.outlook.com",
        secureConnection: false,
        port: 587,
        tls: {
            ciphers:'SSLv3'
            },
        requireTLS:true,
        auth: {
            // sender's account
            user: 'talk2mat7@outlook.com',
            pass: 'chibuzo1'
        }
    });
    let mailOptions = {
        
        // // should be replaced with real recipient's account
        // to: 'talk2martins2@gmail.com',
        // subject: "testing",
        // // req.body.subject,
        // text:"testing covid19 y"
        // //  req.body.message
        from: '"COVID-19 update " <talk2mat7@outlook.com>', // sender address (who sends)
    to: email, // list of receivers (who receives)
    subject: `covid 19-updates for ${COUNT}`, // Subject line
    text: `covid 19-updates for ${COUNT}`, // plaintext body
    html: `<p>Confirmed Cases: ${Confirmed}<br/>Total Deaths: ${Deaths}<br/>Recovered: ${Recovered}<br/> Active Cases : ${Active}<br/><br/>you subscribed for covid-19 alert<br/>this is an automated mail <br/>
    to unsubscribe login into your accounts and unsuscribe </p>`
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
    
  };    
  
 





exports.sendMail=async function (){
const userdata=  await mailSchema.find({});

//checks for subscribers before calling the sendmail function
if(userdata.length>=1){
    
    for(var i=0;i<userdata.length;i++){
        const email=userdata[i].email;
    
        const country= userdata[i].country;
      
const run =sendmail;
await run(email,country)
    }
}else {console.log('not found')}
}