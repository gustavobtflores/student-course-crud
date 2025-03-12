import { randomUUID } from "crypto";
import mongoose, { Types } from "mongoose";

interface Student {
  name: string;
  email: string;
  password: string;
  address: string;
  birthdate: Date;
  courses: Types.ObjectId[];
  registration: string;
}

const StudentSchema = new mongoose.Schema<Student>({
  registration: { type: String, required: true, unique: true, default: randomUUID() },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  birthdate: { type: Date, required: true },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

export default mongoose.model("Student", StudentSchema);
