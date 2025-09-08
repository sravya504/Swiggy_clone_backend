const vendorController=require("../controllers/vendorController")
const express=require("express");
const router=express.Router();

router.post("/register",vendorController.vendorRegister)
router.post("/login",vendorController.vendorLogin)
router.get("/getallvendors",vendorController.getAllVendors)
router.get("/vendorbyid/:id",vendorController.getVendorById)

module.exports=router; 