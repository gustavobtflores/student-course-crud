import mongoose from "mongoose";

interface Course {
  id: string;
  name: string;
  description: string;
  workload: number;
}

const CourseSchema = new mongoose.Schema<Course>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String },
  workload: { type: Number },
});

export default mongoose.model("Course", CourseSchema);
