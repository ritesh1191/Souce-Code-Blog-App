const express = require("express");
const {
  getAllBlogsController,
  createBlogController,
  updateBlogController,
  getBlogByIdController,
  deleteBlogController,
  userBlogController,
} = require("../controllers/blogController");

// router object
const router = express.Router();

// routes
// GET || for getting all blogs
router.get("/all-blog", getAllBlogsController);

// POST || Creating new blogs
router.post("/create-blog", createBlogController);

// PUT || Updating blogs
router.put("/update-blog/:id", updateBlogController);

// GET || get Single blog
router.get("/get-blog/:id", getBlogByIdController);

// DELETE || Deleting your created blogs
router.delete("/delete-blog/:id", deleteBlogController);

// GET || User's Blog
router.get("/user-blog/:id", userBlogController);
module.exports = router;
