const mongoose = require("mongoose");
const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");

// Get All Blogs
exports.getAllBlogsController = async (req, res) => {
  try {
    const blogs = await blogModel.find({}).populate("user");
    if (!blogs) {
      return res.status(200).send({
        success: false,
        message: "No Blogs Found",
      });
    }

    return res.status(200).send({
      success: true,
      BlogCount: blogs.length,
      message: "All Blogs Lists",
      blogs,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error while Getting Blogs",
      error,
    });
  }
};

// Create new Blog
exports.createBlogController = async (req, res) => {
  try {
    const { title, description, image, user } = req.body;
    //validation
    if (!title || !description || !image || !user) {
      return res.status(400).send({
        success: false,
        message: "Please Provide ALl Fields",
      });
    }
    const exisitingUser = await userModel.findById(user);
    //validaton
    if (!exisitingUser) {
      return res.status(404).send({
        success: false,
        message: "unable to find user",
      });
    }

    const newBlog = new blogModel({ title, description, image, user });
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    exisitingUser.blogs.push(newBlog);
    await exisitingUser.save({ session });
    await session.commitTransaction();
    await newBlog.save();
    return res.status(201).send({
      success: true,
      message: "Blog Created!",
      newBlog,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Error WHile Creting blog",
      error,
    });
  }
};

// Update existing Blog
exports.updateBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;
    const blog = await blogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    return res.status(200).send({
      success: true,
      message: "Blog Updated successfully",
      blog,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Error while updating Blog",
      error,
    });
  }
};

// Get a specific Blog
exports.getBlogByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "Blog not found with this ID",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Blog Found",
      blog,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Error while getting single Blog",
      error,
    });
  }
};

// Delete a blog
exports.deleteBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel
      .findByIdAndDelete(req.params.id)
      .populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
    return res.status(200).send({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Error while deleting Blog",
      error,
    });
  }
};

// GET User Blog
exports.userBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const userBlog = await userModel.findById(id).populate("blogs");
    if (!userBlog) {
      return res.status(404).send({
        success: false,
        message: "Blogs not found with this id",
      });
    }
    return res.status(200).send({
      success: true,
      message: "User Blogs",
      userBlog,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Error while getting Users blogs",
      error,
    });
  }
};
