const express=require("express");
const dotenv=require("dotenv");
const app=express();
const mongoose=require("mongoose")
const vendorRouter=require("./routes/vendorRoutes")
const bodyparser=require("body-parser");
const firmRouter=require("./routes/firmRoutes")
const productRouter=require("./routes/productRoutes")
const path=require("path");
const cors= require("cors")

dotenv.config();
app.use(bodyparser.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB connected"))
.catch((err)=>console.log(err));


app.use('/vendor',vendorRouter);  // middleware
app.use('/firm',firmRouter)   // middleware
app.use('/product',productRouter)   // middleware
app.use('/uploads',express.static('uploads'));



app.use('/',(req,res)=>{
   res.send({message:"welcome to Swiggy_clone_backend"})
})

const PORT=process.env.PORT || 4000;
app.listen(PORT,()=>{
    console.log("server started and running successfully");
})
