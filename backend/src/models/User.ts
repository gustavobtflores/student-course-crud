import mongoose, { Types } from "mongoose";
import { v4 as uuid } from "uuid";

interface User {
  id: string;
  email: string;
  password: string;
}

const UserSchema = new mongoose.Schema<User>({
  id: { type: String, required: true, default: uuid() },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default mongoose.model("User", UserSchema);
