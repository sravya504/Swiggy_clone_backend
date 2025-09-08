const Vendor=require("../models/Vendor");
const Firm=require("../models/Firm");
const multer=require("multer");
const Product = require("../models/Product");


   const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // save in uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique name
  },
});
const upload = multer({ storage: storage });




const addFirm=async(req ,res)=>{
  try{
    const {firmname,area,category,region,offer}=req.body;

 const image=req.file?req.file.filename:undefined;


    const vendor=await Vendor.findById(req.vendorId);
    if(!vendor){
        return res.status(404).json({message:"vendor not found"});
    }

    const newfirm=new Firm({
        firmname,area,category,region,offer,image, vendor: vendor._id 
    })
    const savedFirm=await newfirm.save();
     vendor.firm.push(savedFirm)
     await vendor.save()
    return res.status(201).json({message:"firm added successfully"});
  }
  catch(err){
    console.log(err.message);
   return  res.status(500).json({message:"internal server error"});
  }

}


const deleteFirmById=(req,res)=>{
  try{
     const frimId=req.params.productId;
   const deleteFirm=Firm.findByIdAndDelete(FirmId)
   if(!deleteFirm){
    res.status(200).json({message:"product not found"});
   }
  }
  catch(error){
       console.log(error.maessage);
       res.status(500).json({message:"server error"})
  }

}

//module.exports={addFirm:[upload.single('image'),addFirm]}
module.exports={addFirm}

