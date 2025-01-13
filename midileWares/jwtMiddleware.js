const jwt = require('jsonwebtoken');

// to check user logged or not

const jwtMiddleware=(req,res,next)=>{
    console.log('inside jwt middleware')
    const token = req.headers["authorization"].split(" ")[1];

    if(token){

        try{
            const jwtResponse = jwt.verify(token,process.env.JWT_PASSWORD)
            console.log(jwtResponse)
            req.userId=jwtResponse.userId
            next()

        }catch(err){
            res.status(401).json("authorization failed ..please login")
        }
    }else{
        res.status(401).json("authorization failed .. token is missing")
    }
    // next()
}

module.exports = jwtMiddleware