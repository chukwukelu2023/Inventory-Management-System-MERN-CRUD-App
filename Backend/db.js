const mongoose = require('mongoose')
const mongoURI = process.env.mongoURI;

const connectToMongo = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(mongoURI);
    console.log("Connected to Mongo DB Successfully!");
  } catch (error) {
    console.log("Error Message: ",error.message);
  }
};
module.exports = connectToMongo;
