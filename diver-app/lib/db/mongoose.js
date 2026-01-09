import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI");
}

let cached = (global).mongoose;

if (!cached) {
  cached = (global).mongoose = { conn: null, promise: null };
}

async function dbConnect() {

  try {
    const conn = await mongoose.connect(String(process.env.MONGODB_URI));
    return conn;
  }
  catch (e) {
    throw e;
  }

}

export default dbConnect;