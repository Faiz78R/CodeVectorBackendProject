import express from "express"
import dotenv from "dotenv"
dotenv.config()
import connectDB from "./config/connectDb.js"
import router from './routes/productroute.js'
const app= express()

app.use(express.json())
app.use('/api/product',router)
const PORT= process.env.PORT || 6000
app.listen(PORT,()=>{
    console.log(`Server listening at ${PORT}`)
    connectDB()
})
 

