
const router = require("express").Router();
const {payment} = require("../modules/momo")
router.post("/", async (req, res) => {
    const {amount, extraData, orderId, orderInfo} = req.body;
    try {
        const data = await payment(amount, extraData, orderId, orderInfo);
        res.json(data)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

});

module.exports = router;
