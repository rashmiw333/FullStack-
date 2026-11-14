const mongoose = require("mongoose");
require("dotenv").config();

const dns = require("dns");
dns.setServers(["8.8.8.8","8.8.4.4"]);

const initializeDatabase = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);

    if (connection) {
      console.log("MongoDB Connected Successfully");
    }
  } catch (error) {
    console.log("Database Connection Failed", error);
  }
};

module.exports = { initializeDatabase };