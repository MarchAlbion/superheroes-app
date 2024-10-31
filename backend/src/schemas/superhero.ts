import mongoose from "mongoose";

const superHeroSchema = new mongoose.Schema({
  nickname: String,
  real_name: String,
  origin_description: String,
  superpowers: [String],
  catch_phrase: String,
  images: [String],
}, {
  collection: "superheroes",
});

export default mongoose.model("Superhero", superHeroSchema);
