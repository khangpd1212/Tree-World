const router = require("express").Router();
const User = require("../models/User");
const verify = require("../middlewares/verify");

//link http://localhost:8800/user/ method get
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    if (!users) throw new Error("No items");
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// get user by id
router.get("/:id", async (req, res) => {
  try {
    const users = await User.findById(req.params.id);
    if (!users) throw new Error("This user is not found");
    res.status(200).json(users);
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
});

// post user
router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const { username, addresss, email, password, phone_number, isAdmin } =
      req.body;

    const newUser = new User({
      username,
      addresss,
      email,
      password,
      phone_number,
      isAdmin,
    });

    try {
      const user = await newUser.save();
      if (!user) throw new Error("Something were wrong with saving product");
      res.status(200).json({ message: "Create successfully", user });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.status(500).json({ message: "You are not allowed" });
  }
});

//UPDATE
router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      if (!updatedUser)
        throw new Error("Something went wrong with updating user");
      res.status(200).json({ message: "update successfully", updatedUser });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
    
  }
  else if (req.user.isAdmin === false) {
    try {
      const {id_voucher} = req.body;
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: { id_voucher },
        },
        {
          new: true,
        }
      );
      if (!updatedUser)
        throw new Error("Something went wrong with updating product");
      res
        .status(200)
        .json({ message: "update successfully", status: true, updatedUser });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }  
  else {
    res.status(403).json({ message: "You are not allowed" });
  }
});

//delete user
router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "The user has beeen deleted" });
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json({ message: "You are not allowed" });
  }
});

module.exports = router;
