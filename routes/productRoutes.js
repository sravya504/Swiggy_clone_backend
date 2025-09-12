const express=require("express");
const router=require("express").Router();
const productController=require("../controllers/productController");
const Path=require("path")

router.post("/addproduct/:firmId",productController.addProduct)
router.get("/:firmId/products",productController.getProductByFirm)
router.delete('/:productId',productController.deleteProductById)


router.get("/uploads/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  res.setHeader("Content-Type", "image/jpeg");
  res.sendFile(Path.join(__dirname, "..", "uploads", imageName));
});

module.exports=router;