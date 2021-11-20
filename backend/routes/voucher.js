const router = require("express").Router();
const Voucher = require("../models/Voucher");
const verify = require("../middlewares/verify");

router.get("/", async (req, res) => {
    try {
        const vouchers = await Voucher.find();
        if (!vouchers) throw new Error("No items");
        res.status(200).json(vouchers);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// get voucher by id
router.get("/:id", async (req, res) => {
    try {
        const voucher = await Voucher.findById(req.params.id);
        if (!voucher) throw new Error("This voucher is not found");
        res.status(200).json(voucher);
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
});
//user is not allowed create, update or delete
//CREATE
router.post("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
        const newVoucher = new Voucher(req.body);
        try {
            const voucher = await newVoucher.save();
            if (!voucher) throw new Error("Something went wrong with saving voucher");
            res.status(200).json({ message: "Create successfully", voucher });
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
            const updatedVoucher = await Voucher.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                {
                    new: true,
                }
            );
            if (!updatedVoucher)
                throw new Error("Something went wrong with updating voucher");
            res.status(200).json({ message: "update successfully", updatedVoucher });
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
            await Voucher.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "The voucher has been deleted..." });
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json({ message: "You are not allowed" });
    }
});

module.exports = router;
