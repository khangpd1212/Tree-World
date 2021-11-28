const router = require("express").Router();
const Address = require("../models/Address");
const verify = require("../middlewares/verify");

router.get("/", async (req, res) => {
   const { idUser } = req.query;
   try {
      let addresses;
      if (idUser){
         addresses = await Address.find({ idUser: idUser });
      }else{
         addresses = await Address.find();
      }
      if (!addresses) throw new Error("No items");
      res.status(200).json(addresses);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
});

// get address by order id
router.get("/a", async (req, res) => {
   const { idUser } = req.body;
   try {
      
      if (!addresses) throw new Error("No items");
      res.status(200).json(addresses);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
});

// get address by id
router.get("/:id", async (req, res) => {
   try {
      const address = await Address.findById(req.params.id);
      if (!address) throw new Error("This address is not found");
      res.status(200).json(address);
   } catch (error) {
      res.status(403).json({ message: error.message });
   }
});
//user is not allowed create, update or delete
//CREATE
router.post("/", async (req, res) => {
   const { idUser, content, district_id, ward_code } = req.body;
   const newAddress = new Address({ idUser, content, district_id, ward_code});
   try {
      const address = await newAddress.save();
      if (!address) throw new Error("Something went wrong with saving address");
      res.status(200).json({ message: "Create successfully", address });
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
});

//UPDATE
router.put("/:id", verify, async (req, res) => {
   if (req.user.isAdmin) {
      try {
         const updatedAddress = await Address.findByIdAndUpdate(
            req.params.id,
            {
               $set: req.body,
            },
            {
               new: true,
            }
         );
         if (!updatedAddress)
            throw new Error("Something went wrong with updating address");
         res.status(200).json({ message: "update successfully", updatedAddress });
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
         await Address.findByIdAndDelete(req.params.id);
         res.status(200).json({ message: "The address has been deleted..." });
      } catch (error) {
         res.status(500).json(error);
      }
   } else {
      res.status(403).json({ message: "You are not allowed" });
   }
});

module.exports = router;
