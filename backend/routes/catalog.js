const router = require("express").Router();
const Catalog = require("../models/Catalog");
const verify = require("../middlewares/verify");

router.get("/", async (req, res) => {
  try {
    const catalogs = await Catalog.find();
    if (!catalogs) throw new Error("No items");
    res.status(200).json(catalogs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// get catalog by id
router.get("/:id", async (req, res) => {
  try {
    const catalog = await Catalog.findById(req.params.id);
    if (!catalog) throw new Error("This catalog is not found");
    res.status(200).json(catalog);
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
});
//user is not allowed create, update or delete
//CREATE
router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newCatalog = new Catalog(req.body);
    try {
      const catalog = await newCatalog.save();
      if (!catalog) throw new Error("Something went wrong with saving catalog");
      res.status(200).json({ message: "Create successfully", catalog });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.status(403).json({ message: "You are not allowed" });
  }
});

//UPDATE
router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedCatalog = await Catalog.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      if (!updatedCatalog)
        throw new Error("Something went wrong with updating catalog");
      res.status(200).json({ message: "update successfully", updatedCatalog });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.status(403).json({ message: "You are not allowed" });
  }
});

//DELETE
router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await Catalog.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "The catalog has been deleted..." });
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json({ message: "You are not allowed" });
  }
});

module.exports = router;
