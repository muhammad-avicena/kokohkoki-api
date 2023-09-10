const { MongoClient } = require("mongodb");

const connectToDb = async () => {
  try {
    const client = await new MongoClient(process.env.DB_DEV).connect();
    const db = client.db(process.env.DB_NAME);
    console.log("Successfully connected to MongoDB");
    return db;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

module.exports = connectToDb;
