const router = require("express").Router();
const Catalog = require("../models/Catalog");

router.get("/", async (req, res) => {
  try {
    const catalogs = await Catalog.find();
    if (!catalogs) throw new Error("No items");
    res.status(200).json(catalogs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const newCatalog = new Catalog(req.body);
  try {
    const catalog = await newCatalog.save();
    if (!catalog) throw new Error("Something went wrong with saving catalog");
    res.status(200).json(catalog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
