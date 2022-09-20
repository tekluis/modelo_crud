const express = require("express");
const router = express.Router()
const productController = require("../controllers/productController");
const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
       cb(null, path.join(__dirname, "../../public/img")); 
       
    }, 
    filename: function (req, file, cb) { 
       cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);  } 
  })

  const uploadFile = multer({ storage });

router.get("/list", productController.list);
router.get("/detail/:id", productController.detail);
router.get("/create", productController.create);
router.post("/create", uploadFile.single('imagen'), productController.store);
router.get("/edit/:id", productController.edit);
router.put("/edit/:id", productController.update);

router.delete("/edit/:id", productController.borrar);

module.exports = router