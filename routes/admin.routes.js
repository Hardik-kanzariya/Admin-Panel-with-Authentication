 const express = require('express');
 const adminRoutes = express.Router();
 const {addAdminPage, viewAllAdminPage, addNewAdmin, editAdminPage, updateAdmin, deleteAdminPage} = require("../controller/admin.controller");
 const Admin = require('../model/admin.model');
 const passport = require('passport');
 
 adminRoutes.get("/add-admin", addAdminPage);
 
 adminRoutes.get("/view-admin", viewAllAdminPage);
 
 adminRoutes.post("/add-admin", Admin.uploadImage, addNewAdmin);
 
 adminRoutes.get("/edit-admin/:id", editAdminPage);

 adminRoutes.get("/delete-admin/:id", deleteAdminPage);
 
 adminRoutes.post("/update-admin/:id", Admin.uploadImage, updateAdmin);
 
 
 module.exports = adminRoutes;