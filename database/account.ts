import mongoose from "mongoose";
let accountScheme = new mongoose.Schema(
  {
    uid: String,
    name: String,
    pin: String,
  },
  { timestamps: true }
);

let Account =
  mongoose.models.Account ||
  mongoose.model("Account", accountScheme);
export default Account;
