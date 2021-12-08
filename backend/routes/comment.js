const router = require("express").Router();
const Comment = require("../models/Comment");
const verify = require("../middlewares/verify");

router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find();
    if (!comments) throw new Error("No items");
    res.status(200).json(comments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// get comment by id
router.get("/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) throw new Error("This comment is not found");
    res.status(200).json(comment);
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
});
//user is not allowed create, update or delete
//CREATE
router.post("/", verify, async (req, res) => {
  if (!req.user.isAdmin) {
    const newComment = new Comment(req.body);
    try {
      const comment = await newComment.save();
      if (!comment) throw new Error("Something went wrong with saving comment");
      res
        .status(200)
        .json({ message: "Create successfully", status: true, comment });
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
      const updatedComment = await Comment.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      if (!updatedComment)
        throw new Error("Something went wrong with updating comment");
      res
        .status(200)
        .json({ message: "update successfully", status: true, updatedComment });
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
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "The comment has been deleted..." });
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json({ message: "You are not allowed" });
  }
});

module.exports = router;
