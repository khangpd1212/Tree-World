const router = require("express").Router();
const Product = require("../models/Product");
const verify = require("../middlewares/verify");
// get all products
//link http://localhost:8800/product/ method get
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) throw new Error("No items");
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// get product by id
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) throw new Error("This product is not found");
    res.status(200).json(product);
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
});

// create product
router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const {
      product_name,
      price,
      description,
      isNew,
      catalog_id,
      image,
      inventory,
      color,
    } = req.body;

    const newProduct = new Product({
      product_name,
      price,
      description,
      isNew,
      catalog_id,
      image,
      inventory,
      color,
    });

    try {
      const product = await newProduct.save();
      if (!product) throw new Error("Something were wrong with saving product");
      res.status(200).json({ message: "Create successfully", product });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.status(500).json({ message: "You are not allowed" });
  }
});

//UPDATE
router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      if (!updatedProduct)
        throw new Error("Something went wrong with updating product");
      res.status(200).json({ message: "update successfully", updatedProduct });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.status(403).json({ message: "You are not allowed" });
  }
});

//delete product
router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "The product has beeen deleted" });
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json({ message: "You are not allowed" });
  }
});

module.exports = router;
