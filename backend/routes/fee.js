const router = require("express").Router();
const feeController = require("../modules/fee");
router.get("/", async (req, res) => {
   const { province, district, address, ward, weight, transport } 
   = req.query;
   try {
      const data = await feeController.getFee(province, district, address, ward);
      res.json(data);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
});
module.exports = router;
