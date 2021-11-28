const router = require("express").Router();
const Order = require("../models/Order");
const verify = require("../middlewares/verify");

router.get("/", async (req, res) => {
    try {
        const orders = await Order.find();
        if (!orders) throw new Error("No items");
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// get order by id
router.get("/:id", async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) throw new Error("This order is not found");
        res.status(200).json(order);
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
});

//user is not allowed create, update or delete
//CREATE
router.post("/", async (req, res) => {
    const {
        username,
        address,
        status,
        phoneNumber,
        orderDate,
        toTal,
        idUser,
        idVoucher
    } = req.body;

    const newOrder = new Order({
        username,
        address,
        status,
        phoneNumber,
        orderDate,
        toTal,
        idUser,
        idVoucher
    });
    try {
        const order = await newOrder.save();
        if (!order) throw new Error("Something went wrong with saving order");
        res.status(200).json({ message: "Create successfully", order });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

});

//UPDATE
router.put("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const updatedOrder = await Order.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                {
                    new: true,
                }
            );
            if (!updatedOrder)
                throw new Error("Something went wrong with updating order");
            res.status(200).json({ message: "update successfully", updatedOrder });
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
            await Order.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "The order has been deleted..." });
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json({ message: "You are not allowed" });
    }
});

module.exports = router;
