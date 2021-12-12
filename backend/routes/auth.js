const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const sendMail = require("../modules/sendMail");

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    phone_number: req.body.phone_number,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
  });
  try {
    const checkEmail = await User.findOne({ email: req.body.email })
    if (checkEmail) {
      return res.status(403).json({ message: "Email already exists" })
    }
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(403).json("Username is not found");

    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
    originalPassword !== req.body.password &&
      res.status(403).json("Password is wrong");

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: "5d" }
    );

    const { password, ...info } = user._doc;
    res.status(200).json({ ...info, accessToken });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/reset-password", async (req, res) => {
  const email = req.body.email
  try {
    const user = await User.findOne({ email: email })
    if (!user || user.isAdmin === true) {
      res.status(403).json({ message: "User with this email does not exist." })
    }
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: "5d" }
    );
    if (user.token === '') {
      await User.findByIdAndUpdate(
        user._id,
        {
          $set: { token: token },
        },
        {
          new: true,
        }
      );
    }
    const link = `${process.env.BASE_URL_CLIENT}/reset-password/?id=${user._id}&token=${token}`

    await sendMail(user.email, "Password reset", user.username, link);
    res.status(200).json({ message: "Please check your email" });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/reset-password/:userId/:token", async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.params.userId,
      token: req.params.token,
    });

    if (!user) return res.status(400).json({ message: "Invalid link or expired" });

    const password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString();
    await User.findByIdAndUpdate(
      user._id,
      {
        $set: { token: '', password: password },
      },
      {
        new: true,
      }
    );
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
});


module.exports = router;
