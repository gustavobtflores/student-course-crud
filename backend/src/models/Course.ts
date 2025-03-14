import { v4 as uuid } from "uuid";
import mongoose from "mongoose";

export interface Course {
  id: string;
  name: string;
  description: string;
  code: string;
}

const CourseSchema = new mongoose.Schema<Course>({
  id: { type: String, required: true, unique: true, default: () => uuid() },
  name: { type: String, required: true },
  description: { type: String },
  code: { type: String },
});

export default mongoose.model("Course", CourseSchema);
