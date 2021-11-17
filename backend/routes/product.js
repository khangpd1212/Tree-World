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
// filter product
router.get("/filter", async (req, res) => {
  const catalog = req.query.catalog;
  const isNew = req.query.new;
  const bestSeller = req.query.sales;
  const isHot = req.query.hot;
  const match = {};
  //sort
  let sort = { _id: 1 };
  //filter by price
  const price = req.query.price;
  const priceMin = req.query.priceMin;
  const priceMax = req.query.priceMax;
  const order = req.query.order;
  //pagination
  let page = 0;
  let products = [];
  if (catalog) {
    match.catalog_id = catalog;
  }
  if (isNew) {
    match.isNew = isNew.toLowerCase() === "true";
  }
  if (priceMin && priceMax && parseFloat(priceMin) <= parseFloat(priceMax)) {
    match.price = {
      ...match.price,
      $lte: parseInt(priceMax),
      $gte: parseInt(priceMin),
    };
  }
  if (bestSeller) {
    sort = { sold: bestSeller.toLowerCase() === "true" ? -1 : 1 };
  }
  if (isHot) {
    sort = { isHot: isHot.toLowerCase() === "true" ? -1 : 1 };
  }
  if (order && price.toLowerCase() === "true") {
    sort = { price: order.toLowerCase() === "asc" ? 1 : -1 };
  }
  if (req.query.page) {
    page = req.query.page;
  }

  try {
    products = await Product.aggregate([
      {
        $match: match,
      },
      { $sort: sort },
      { $skip: 5 * parseInt(page) },
      { $limit: 5 },
    ]);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error });
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
      color
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

//search
router.post("/search", async (req, res) => {
  const { keyword } = req.body;
  try {
    await Product.search(keyword, function (err, data) {
      res.status(200).json(data);
    });
  } catch (error) {
    res.status(500).json({ message: error });
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
