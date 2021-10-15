const router = require("express").Router();
const addressController = require("../modules/address");
router.get("/province", async (req, res) => {
  try {
    const data = await addressController.getProvince();
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.get("/district", async (req, res) => {
  const { province_id } = req.body;
  try {
    const data = await addressController.getDistrict(province_id);
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/ward", async (req, res) => {
  const { district_id } = req.body;
  try {
    const data = await addressController.getWard(district_id);
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
module.exports = router;
