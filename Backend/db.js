const mongoose = require('mongoose');
const logger = require('./logger');
const mongoURI = process.env.mongoURI;

const connectToMongo = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(mongoURI);
    logger.info("Connected to Mongo DB Successfully!");
  } catch (error) {
    logger.error("Error connecting to Mongo DB:", error.message);
  }
};
module.exports = connectToMongo;
