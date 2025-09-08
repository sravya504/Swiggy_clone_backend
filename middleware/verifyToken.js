const Vendor=require("../models/Vendor");
const jwt=require("jsonwebtoken");
const dotenv=require("dotenv");

dotenv.config();
const secretKey=process.env.WhatIsYourName;

const verifyToken=async(req,res,next)=>{
    const token = req.headers.token || req.query.token; 
  // to send token along with req to the server using headers
    if(!token){
        return res.status(401).json({message:"token is required"});
       }
       try{
        const decoded=jwt.verify(token,secretKey);
        const vendor=await Vendor.findById(decoded.vendorId);
          if(!vendor){
            return res.status(404).json({message:"vendor not found"});
          }

          req.vendorId=vendor._id;
          next();  // to pass the control
       }
       catch(err){
        return res.status(401).json({message:"Invalid token"});
       }
}

module.exports=verifyToken


