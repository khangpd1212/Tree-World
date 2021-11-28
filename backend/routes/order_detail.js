const router = require("express").Router();
const Order_detail = require("../models/Order_detail");
const verify = require("../middlewares/verify");

router.get("/", async (req, res) => {
   try {
      const order_details = await Order_detail.find();
      if (!order_details) throw new Error("No items");
      res.status(200).json(order_details);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
});

router.post("/", async (req, res) => {
   const {id_order, id_product, quantity, color} = req.body;
   const newOrderDetail = new Order_detail({
      id_order,
      id_product,
      quantity,
      color,
   })
    try {
       const order_detail = await newOrderDetail.save();
       if (!order_detail) throw new Error("Something went wrong with saving order detail");
       res.status(200).json({ message: "Create successfully", order_detail });
    } catch (error) {
       res.status(400).json({ message: error.message });
    }
});
module.exports = router;