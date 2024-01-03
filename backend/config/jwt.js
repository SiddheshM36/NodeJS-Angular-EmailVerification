const jwt = require('jsonwebtoken')


const loinRequired = async (req, res, next)=>{
    console.log('i m called')
    //grab the token
    const token = await req.headers['authorization'].substr(7)
    console.log('token from header : ', token)
    if(token){
        const verifyToken = await jwt.verify(token, process.env.JWT_SECRET)
        if(verifyToken){
            req.decodedToken = verifyToken
            console.log(req.decodedToken)
            next()
            // res.redirect('/dashboard')
        }
        else{
            console.log('Token not verified')
        }
    }
    else{
        res.json('Invaild token')
    }

}



module.exports = loinRequired