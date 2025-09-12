const Product=require("../models/Product")
const multer=require("multer")
const Firm=require("../models/Firm");
const path=require('path')


  const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // save in uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique name
  },
});
const upload = multer({ storage: storage });


const addProduct=async(req,res)=>{
    try{
        const {productName,price,category,bestSeller,description}=req.body;
        const image=req.file?req.file.filename:undefined;
        const firmId=req.params.firmId;
        const firm=await Firm.findById(firmId);
        if(!firm){
          res.status(400).json({message:"firm not found"});
        }
      const newproduct=new Product({  

     productName,price,category,bestSeller,description,image,firm:firm._id
    })
        const savedProduct=await newproduct.save();
       firm.product.push(savedProduct)
        await firm.save();
        res.status(201).json({message:"product added successfully"})
    }
    catch(err){
      console.log(err.message)
      res.status(500).json({message:"Server Error"})
    }
}

const getProductByFirm=async(req,res)=>{

  try{
      const firmId=req.params.firmId;
  const firm=await Firm.findById(firmId)
  if(!firm){
    res.status(400).json({message:"firm not found"})
  }
  const resturantName=firm.firmname ;
  const products=await Product.find({firm:firmId});
  res.status(200).json({resturantName,products}) ;
  }
  catch(err){
     res.status(500).json({message:"server error"})  ;
  }
}


const deleteProductById=async(req,res)=>{
  try{
     const productId=req.params.productId;
   const deleteProduct= await Product.findByIdAndDelete(productId)
   if(!deleteProduct){
    res.status(200).json({message:"product not found"});
   }
  }
  catch(error){
       console.log(error.message);
       res.status(500).json({message:"server error"})
  }

}


module.exports={addProduct:[upload.single('image'),addProduct],getProductByFirm,deleteProductById} ;
