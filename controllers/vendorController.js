const Vendor=require("../models/Vendor");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const dotenv=require("dotenv");

dotenv.config();
const secretKey=process.env.WhatIsYourName;


const vendorRegister=async(req,res)=>{
    const {username,email,password}=req.body ;
    try{
       
         const vendorEmail=await Vendor.findOne({email});
         if(vendorEmail){
            return res.status(400).json({message:"Email already existed"})
         }

          const hashpassword=await bcrypt.hash(password,10);
          const newVendor=new Vendor({
            username,email,password:hashpassword
          })
          await newVendor.save();
          res.status(200).json({message:"vendor registered successfully"})
          
          console.log("registered");

    }                                               
    catch(err){
        console.log(err);
        res.status(500).json({message:"internal server error"})
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
   res.status(200).json({
  message: "Login successful",
  token,
  vendorId: vendLogin._id
});

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
  //  const vendorFirmId=vendor.firm[0]._id||null ;
  let vendorFirmId = null;
    let vendorFirmname = null;

    if (vendor.firm && vendor.firm.length > 0) {
      vendorFirmId = vendor.firm[0]._id;
      vendorFirmname = vendor.firm[0].firmname;
    }
   console.log("VendorId:", vendorId, "FirmId:", vendorFirmId);

    res.status(200).json({
      vendor,
      vendorFirmId,
      vendorFirmname

    });

  
  
}
catch(err){
  res.status(500).json({message:"internal server error"});
}
}


module.exports={vendorRegister,vendorLogin,getAllVendors,getVendorById}
