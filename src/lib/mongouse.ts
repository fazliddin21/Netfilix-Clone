import mongoose, {
  ConnectOptions,
} from "mongoose";

let isConetct: boolean = false;

export const ConnectDataBase = async () => {
  mongoose.set("strictQuery", true);
  if (!process.env.MONGODB_URL) {
    throw new Error("MONGO_URL is not defined");
  }
  if (isConetct) {
    return;
  }
  try {
    const option: ConnectOptions = {
      dbName: "netfilix",
      autoCreate: true,
    };
    await mongoose.connect(
      process.env.MONGODB_URL,
      option
    );
    isConetct = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};
