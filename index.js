require('dotenv').config()
const express= require('express')
const cors=require('cors')
const router=require('./routes/router')
require('./db/connection')


const pfServer = express()
pfServer.use(cors())

pfServer.use(express.json()) // req json to js object

pfServer.use(router)

pfServer.use('/uploads',express.static('./uploads'))


const PORT = 3000 || process.env.PORT

pfServer.listen(PORT,()=>{
    console.log(`server running at port ${PORT}` )
})

pfServer.get('/',(req,res)=>{
    res.status(200).send(`<h2>prowwject fjair server fsdf started and waiting for client request </h2>`)
})