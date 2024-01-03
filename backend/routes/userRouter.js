const express = require('express')
const router = express.Router()
const User = require('../models/user')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const loginRequired = require('../config/jwt')
const nodeMailer = require('nodemailer')

console.log(process.env.EMAIL_ADDRESS)

//node mailer
var transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
    },
    tls:{
        rejectUnauthorized :  false
    }
})




//register route
router.post('/register', async (req, res)=>{
    // console.log(' register api called')
    const user = { name : req.body.name, email : req.body.email, password : req.body.password }
    const alreadyUser = await User.findOne({where : { email : user.email }})
    if(alreadyUser){
        console.log('User already exixts')
    }
    else{
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(user.password, salt)
        const cryptoToken = await crypto.randomBytes(64).toString('hex')
        const newUser = await User.create({
            name :  user.name, 
            email : user.email,
            password : hashPassword,
            emailToken : cryptoToken,
            isVerified: false

        })
        res.json(newUser)
        

        // content of the mail 
        console.log('using this email for sending mail:' + newUser.email + "and email token is" + newUser.emailToken)
        var mailOptions = {
            from : ' "MEAN STACK EMAIL_VERIFICATION"  <codewithsid36@gmail.com>',
            to: newUser.email,
            subject: 'codewithsid - Verify your email',
            html : `<h3> ${newUser.name} ! Thanks for registering our site.. </h3>
                    <h4> In order to proceed further please click on below link for email verification </h4>
                    <a href="http://${req.headers.host}/user/verify-email?token=${newUser.emailToken}"> Verify the email </a>`       
                    
       
                }
                

        
        //sending mail
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log('I m in the sending mail block');
                console.log(error.message)
            }
            else{
                console.log("Verfication mail sent to your mail address.....")
            }
        })


        // console.log(newUser)
        console.log(' resgiter success')
    }
    
})

//token
const  createToken = (id, email)=>{
    return jwt.sign({ id, email }, process.env.JWT_SECRET)
}


//login route
router.post('/login', async(req, res)=>{
    const user = { email : req.body.email, password : req.body.password }
    const presentUser = await User.findOne({ where : { email : user.email }})
    // console.log('sid was here :' ,presentUser.email, user.email)
    if(presentUser){
        const passwordMatch = await bcrypt.compare(user.password, presentUser.password)
        if(passwordMatch){
            console.log('login success')
            // res.json('Login is success baby')
            const token = await createToken(presentUser.id, presentUser.email)   
            res.json({status : '200', data : { token }})
            console.log(token)
        }
        else{
            console.log('invalid password')
        }
    }
    else{
        console.log('Invaild email address')
    }

})



//email token verification in db
router.get('/verify-email', async (req, res)=>{
    try{
        console.log('verification api call')
        const emailToken = req.query.token
        console.log(emailToken)
        const user = await User.findOne({ where : { emailToken : emailToken } })
        if(user){
            // console.log(user)
            user.emailToken = null,
            user.isVerified = true
        }
        const updatedUser = await user.save()
        // res.redirect('http://localhost:4200/login')
     
        
    }
    catch(err){
        console.log(err)
    }
})












//dashboard route
router.get('/dashboard', loginRequired, async(req, res)=>{
    console.log('dashboard url called :')
    res.json('Dashboard is here baby')
})


module.exports = router