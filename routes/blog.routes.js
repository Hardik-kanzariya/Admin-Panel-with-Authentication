 const express = require('express');
 const blogRoutes = express.Router();
 const {addBlogPage, viewAllBlogPage, addNewBlog, editBlogPage, updateBlog, deleteBlog, singleBlogPage} = require("../controller/blog.controller");
 const Blog = require('../model/blog-model');
 
 blogRoutes.get("/add-blog",  addBlogPage);
 
 blogRoutes.get("/view-blog", viewAllBlogPage);
 
 blogRoutes.post("/add-blog", Blog.uploadImage, addNewBlog);
 
 blogRoutes.get("/single-blog/:id", singleBlogPage);
 blogRoutes.get("/edit-blog/:id", editBlogPage);

 blogRoutes.get("/delete-blog/:id", deleteBlog);
 
 blogRoutes.post("/update-blog/:id", Blog.uploadImage, updateBlog);
 
 
 module.exports = blogRoutes;