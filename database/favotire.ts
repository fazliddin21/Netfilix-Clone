import mongoose from "mongoose";

const favoriteScheme = new mongoose.Schema({
    uid: String,
    accountId: String,
    backdrop_path: String,
    poster_path: String,
    movieId: String,
    type: String,
}, { timestamps: true });


const Favorite = mongoose.models.Favorite || mongoose.model("Favorite", favoriteScheme);
export default Favorite