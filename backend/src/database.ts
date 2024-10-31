import mongoose from "mongoose";

export async function connectToDatabase() {
  try {
    await mongoose.connect("mongodb://localhost:27017/superheroes");
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
}
