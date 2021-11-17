
const router = require("express").Router();
const {payment} = require("../modules/momo");
const addressController = require("../modules/address");
const feeController = require("../modules/fee");
const serviceController = require("../modules/service")

router.post("/", async (req, res) => {
    const {amount, extraData, orderId, orderInfo} = req.body;
    try {
        const data = await payment(amount, extraData, orderId, orderInfo);
        res.json(data)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

});

// Tính phí vận chuyển
router.get("/fee", async (req, res) => {
    const { service_id, to_district_id, to_ward_code}
        = req.query;
    try {
        const data = await feeController.getFee(service_id, to_district_id, to_ward_code);
        res.json(data);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Lấy loại dịch vụ 
router.get("/service/:to_district", async (req, res) => {
    const {to_district} = req.params;
    try {
        const data = await serviceController.getService(to_district);
        res.json(data);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Lấy địa chỉ tỉnh thành phố
router.get("/province", async (req, res) => {
    try {
        const data = await addressController.getProvince();
        res.json(data);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.get("/district/:province_id", async (req, res) => {
    const { province_id } = req.params;
    try {
        const data = await addressController.getDistrict(province_id);
        res.json(data);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.get("/ward/:district_id", async (req, res) => {
    const { district_id } = req.params;
    try {
        const data = await addressController.getWard(district_id);
        res.json(data);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
