import { connect as mongooseConnect } from "mongoose";

export const connect = async () => {
  await mongooseConnect(process.env.MONGODB_URL!);
  console.log("Connected to MongoDB");
};
