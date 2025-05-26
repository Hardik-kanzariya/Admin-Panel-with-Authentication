const mongoose = require("mongoose");
const multer = require('multer');
const path = require('path');

const blogSchema = mongoose.Schema({
  title: String,
  content:  String,
  image: String,
  category: String,
  createdAt:{
    type :  Date,
    default: Date.now,}
});


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "uploads"))
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}`);
    }
});

blogSchema.statics.uploadImage = multer({storage: storage}).single('image');
const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
