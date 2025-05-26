
const mongoose = require("mongoose");

const dbconnect = () => {
    mongoose.connect("mongodb+srv://hardikkanzariya620:hardik123@cluster0.ij995.mongodb.net/Admin-panel")
    .then(() => console.log("Database connected successfully..."))
    .catch(err => console.error("Database Connection Error:", err));
};

module.exports = dbconnect();
