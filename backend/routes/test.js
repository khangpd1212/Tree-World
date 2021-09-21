const router = require("express").Router();
router.get("/", (req, res) => {
  res.status(200).json({
    text: "hihihihi",
    msg: "This is CORS-enabled for all origins",
  });
});
module.exports = router;
