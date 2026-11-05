const mongoose = require('mongoose');
require('dotenv').config();

console.log("Connecting to MongoDB...");

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((err) => {
        console.log("Something error:", err);
    });
