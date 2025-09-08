const Vendor=require("../models/Vendor");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const dotenv=require("dotenv");

dotenv.config();
const secretKey=process.env.WhatIsYourName;

dotenv.config();
const vendorRegister=async(req,res)=>{
    const {username,email,password}=req.body ;
    try{
       
         const vendorEmail=await Vendor.findOne({email});
         if(vendorEmail){
            return res.status(400).json({message:"Email already existed"})
         }

          const hashpassword=await bcrypt.hash(password,10);
          const newVednor=new Vendor({
            username,email,password:hashpassword
          })
          await newVednor.save();
          res.status(201).json({message:"vendor registered successfully"})
          
          console.log("registered");

    }                                               
    catch(err){
        console.log(err);
        res.status(500).json({meassage:"internal server error"})
    }

}


const vendorLogin=async(req,res)=>{
  const {email,password}=req.body;
  try{
    const vendLogin=await Vendor.findOne({email});
    if(!vendLogin || !(await bcrypt.compare(password,vendLogin.password))){
      return res.status(400).json({message:"Invalid credentials"})
    }
    const token=jwt.sign({vendorId:vendLogin._id},secretKey,{expiresIn:"1h"})
   res.status(201).json({message:"login successfull",token})
   console.log(email);

}
   catch(err){
    console.log(err);
      res.status(500).json({message:"internal server error"})
   }
}

const getAllVendors=async(req,res)=>{
  try{
        const vendors=await Vendor.find().populate('firm');
        res.json(vendors)

  }
  catch(err){
    res.status(500).json({message:"internal server error"});
  }
}

const getVendorById=async(req,res)=>{

const vendorId=req.params.id;
try{
 const vendor=await Vendor.findById(vendorId).populate('firm');
 if(!vendor){
   return res.status(404).json({message:"vendor not find"});
 }
  res.status(201).json({vendor})
}
catch(err){
  res.status(500).json({message:"internal server error"});
}
}


module.exports={vendorRegister,vendorLogin,getAllVendors,getVendorById}
