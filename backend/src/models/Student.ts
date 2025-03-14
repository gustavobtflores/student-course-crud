import { v4 as uuid } from "uuid";
import mongoose, { Types } from "mongoose";

interface Student {
  name: string;
  address: string;
  birthdate: Date;
  courses: Types.ObjectId[];
  registration: string;
}

const StudentSchema = new mongoose.Schema<Student>({
  name: { type: String, required: true },
  birthdate: { type: Date, required: true },
  address: { type: String },
  registration: { type: String, required: true, unique: true, default: () => uuid() },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

export default mongoose.model("Student", StudentSchema);
