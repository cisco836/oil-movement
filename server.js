const cors = require('cors')
const express = require("express")
const app = express()
const pool = require('./connection')
const bodyParser = require("body-parser")
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
const router = require('./shipmentIn')


app.use('/route',router)

app.get('/',(req,res)=>{
   
})

app.listen(process.env.PORT || 3001,()=>console.log("SERVER LISTENING AT 3000"))
