const testimonials = require('../modal/testimonModal')


exports.addTestimonyController=async(req,res)=>{
    console.log("inside addTestimonialsController ");
    
    const {name,email,message}=req.body

    try{
        const newTestimony= new testimonials({name,email,message})

        await newTestimony.save()
        res.status(200).json(newTestimony)
    }
    catch(err){
        res.status(401).json(err)
    }
}