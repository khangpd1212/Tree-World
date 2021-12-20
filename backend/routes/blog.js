const router = require("express").Router();
const Blog = require("../models/Blog");
const verify = require("../middlewares/verify");

//get blog
router.get("/", async (req, res) => {
  const requestCount = req.query.limit;
  const requestSkip = req.query.skip;
  try {
    let blogs;
    if (requestCount) {
      blogs = await Blog.find().countDocuments().then(count => {
        if (requestSkip > count || blogStatus) {
          return
        }
        return Blog.find().sort({ create_date: -1 }).limit(Number(requestCount)).skip(Number(requestSkip));
      })
    } else {
      blogs = await Blog.find().sort({ create_date: -1 });
    }
    if (!blogs) throw new Error("No items");
    res.status(200).json(blogs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) throw new Error("This blog is not found");
    res.status(200).json(blog);
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
});

//create blog
router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const { title, content, id_user, status, image } = req.body;
    const newBlog = new Blog({ title, content, id_user, status, image });
    try {
      const blog = await newBlog.save();
      if (!blog) throw new Error("Something was wrong with saving blog");
      res
        .status(200)
        .json({ message: "Create successfully", status: true, blog });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.status(500).json({ message: "You are not allowed" });
  }
});

//update
router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      if (!updatedBlog) throw new Error("Error");
      res
        .status(200)
        .json({ message: "Update successfully", status: true, updatedBlog });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.status(500).json({ message: "You are not allowed" });
  }
});
module.exports = router;
