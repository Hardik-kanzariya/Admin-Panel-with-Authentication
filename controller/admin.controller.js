const Admin = require("../model/admin.model");
 const path = require("path");
 const fs = require("fs");
 
 exports.addAdminPage = async (req, res) => {
  return res.render("add-admin");
};
 
exports.viewAllAdminPage = async (req, res) => {
    let admins = await Admin.find();
    return res.render("view-admin", { admins});
};  
 
 exports.addNewAdmin = async (req, res) => {
   try {
     let imagePath = "";
     if (req.file) {
       imagePath = `/uploads/${req.file.filename}`;
       req.body.image = imagePath;
     }
 
     let admin = await Admin.create(req.body);
     return res.redirect("back");
   } catch (error) {
     console.log(error);
   }
 };
 
 exports.editAdminPage = async (req, res) => {
  try {
    let admin = await Admin.findById(req.params.id);
    if (admin) {
      return res.render("edit-admin", { admin });
    }
  } catch (error) {
    console.log(error);
  }
};
 
 exports.deleteAdminPage = async (req, res) => {
  try {
    let admin = await Admin.findById(req.params.id);

    if (!admin) return res.redirect("back");

    if (admin.image) {
      let imagePath = path.join(__dirname, "..","public",  admin.image);
      try {
        fs.unlinkSync(imagePath);
      } catch (error) {
        console.log("Image Not Found...");
      }
    }

    await Admin.findByIdAndDelete(req.params.id);
    return res.redirect("/admin/view-admin");
  } catch (error) {
    console.error(error);
    return res.redirect("back");
  }
};

exports.updateAdmin = async (req, res) => {
  try {
    let admin = await Admin.findById(req.params.id);
    if (admin) {
      if (req.file) {
        let imagePath = "";
        if (admin.image !== "") {
          imagePath = path.join(__dirname, "..", admin.image);
          try {
            await fs.unlinkSync(imagePath);
          } catch (error) {
            console.log("Image Not Found...");
          }
        }
        imagePath = `/uploads/${req.file.filename}`;
        req.body.image = imagePath;
      }

      let updateAdmin = await Admin.findByIdAndUpdate(admin._id, req.body, {
        new: true,
      });
      if (updateAdmin) {
        return res.redirect("/admin/view-admin");
      } else {
        return res.redirect("back");
      }
    } else {
      return res.redirect("back");
    }
  } catch (error) {
    console.log(error);
  }
};