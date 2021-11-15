const router = require("express").Router();
const addressController = require("../modules/address");
router.get("/", async (req, res) => {
  try {
    const data = await addressController.getAddress();
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
module.exports = router;
