const express = require('express');
const routes = express.Router();
const {dashBoard, loginPage, loginAdmin, logout, forgotPasswordPage, sendEmail, verifyOTP, changePassword,  changePasswordPage, resetPassword,profile} = require("../controller/index.controller");
const passport = require('passport');
 
 
 routes.get("/", loginPage);
 routes.get("/dashboard", passport.checkAuthenticated, dashBoard);
 
 routes.post("/login", passport.authenticate('local',{failureRedirect: "/"} ),  loginAdmin);
 routes.get("/logout", logout);
 routes.get("/profile", profile);
 
 routes.get("/forgotPassword", forgotPasswordPage);
 routes.post("/sendEmail", sendEmail);
 routes.post("/verify-otp", verifyOTP);
 routes.post("/reset-password", resetPassword);

 routes.get("/change-password",  passport.checkAuthenticated, changePasswordPage);
 routes.post("/change-password",  passport.checkAuthenticated, changePassword);
 
 routes.use("/admin", passport.checkAuthenticated, require('./admin.routes'))
 routes.use("/blog", passport.checkAuthenticated, require('./blog.routes'))
 
 
 module.exports = routes;
