const express=require("express");
const router=express.Router();
const verifyToken=require("../middleware/verifyToken");
const firmController=require("../controllers/firmController");

router.post("/addfirm",verifyToken,firmController.addFirm);

router.delete("/:firmId",firmController.deleteFirmById)

router.get("'/uploads/:imageName",(req,res)=>{
    const imageName=req.params.imageName;
    res.headersSent('Content-Type',image/jpg);
    res.sendFile(Path.join(__dirname,"..",'uploads',imageName)) ;
})

module.exports=router;
