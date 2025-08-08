const mongoose = require('mongoose')
const mongoURI = process.env.mongoURI;

const connectToMongo = async () => {
  try {
    console.log({mongoURI})
    mongoose.set("strictQuery", false);
    await mongoose.connect(mongoURI);
    console.log("Connected to Mongo Successfully!");
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = connectToMongo;
