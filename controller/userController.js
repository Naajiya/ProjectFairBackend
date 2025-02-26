const users = require('../modal/userModal')
const jwt = require('jsonwebtoken')

exports.userRegister = async (req, res) => {
    console.log("inside register Controller")

    const { username, email, password } = req.body;
    console.log(username, email, password);
    // res.status(200).json("requuest sent successfully");

    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {

            res.status(406).json("Account already exist... please login")
        } else {
            const newUser = new users({ username, email, password, github: "", linkedin: "", profile: "" })
            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (err) {
        res.status(401).json(err)
    }

}



exports.userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await users.findOne({ email, password })
        if (existingUser) {
            console.log('token')
            const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_PASSWORD)
            console.log(token)
            res.status(200).json({ user: existingUser, token })
           

        } else {
            res.status(404).json("invalid username or password")
        }
    } catch (err) {
        console.log(err)
    }


}


exports.updateUserProfile=async(req,res)=>{

    console.log("inside user profile update controller")

    const {username,email,password,github,link,profile}=req.body
    const uploadImg=req.file ? req.file.filename:profile

    const userId=req.userId

    try{

        const updatedUser = await users.findByIdAndUpdate({_id:userId},{username,email,password,github,link,profile:uploadImg},{new:true})

        updatedUser.save()

        res.status(200).json(updatedUser)

    }catch(err){
        res.status(401).json(err)
    }

}
