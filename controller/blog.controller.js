const Blog = require("../model/blog-model");
const Admin = require("../model/admin.model");
const path = require("path");
const fs = require("fs");


exports.addBlogPage = async (req, res) => {
  let admin = req.user;
  return res.render("add-blog", { admin });
};

exports.viewAllBlogPage = async (req, res) => {
  let loginAdmin = req.user;
  let category = req.query.category ? req.query.category.toLowerCase() : null;

  let blogs;
  if (category) {
    blogs = await Blog.find({ category: new RegExp(`^${category}$`, "i") }); // Case-insensitive search
  } else {
    blogs = await Blog.find();
  }

  return res.render("view-blog", { blogs, category, admin: loginAdmin });
};


exports.addNewBlog = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = `/uploads/${req.file.filename}`;
    }
    await Blog.create(req.body);
    return res.redirect("back");
  } catch (error) {
    console.error(error);
  }
};

exports.editBlogPage = async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id);
    if (blog) {
      return res.render("edit-blog", { blog, admin: req.user });
    }
  } catch (error) {
    console.error(error);
  }
};

exports.singleBlogPage = async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id);
    if (blog) {
      return res.render("single-blog", { blog, admin: req.user });
    }
  } catch (error) {
    console.error(error);
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id);
    if (!blog) return res.redirect("back");

    if (blog.image) {
      let imagePath = path.join(__dirname, "..", "public", blog.image);
      try {
        fs.unlinkSync(imagePath);
      } catch (error) {
        console.log("Image Not Found...");
      }
    }

    await Blog.findByIdAndDelete(req.params.id);
    return res.redirect("/blog/view-blog");
  } catch (error) {
    console.error(error);
    return res.redirect("back");
  }
};

exports.updateBlog = async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id);
    if (blog) {
      if (req.file) {
        if (blog.image) {
          let imagePath = path.join(__dirname, "..", blog.image);
          try {
            fs.unlinkSync(imagePath);
          } catch (error) {
            console.log("Image Not Found...");
          }
        }
        req.body.image = `/uploads/${req.file.filename}`;
      }
      let updatedBlog = await Blog.findByIdAndUpdate(blog._id, req.body, {
        new: true,
      });
      return updatedBlog ? res.redirect("/blog/view-blog") : res.redirect("back");
    } else {
      return res.redirect("back");
    }
  } catch (error) {
    console.error(error);
  }
};
