import mongoose from "mongoose";
import { Schema } from "mongoose";
import { Document } from "mongoose";

export interface IStudent extends Document {
    studentId: String,
    firstName: String,
    lastName: string;
    email: string;
    course: string;
    batch: string;
    age: number;
}

const studentSchema: Schema = new Schema({
    studentId: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    course: { type: String, required: true },
    batch: { type: String, required: true },
    age: { type: Number, required: true }
}, {
    timestamps: true
})

export default mongoose.model<IStudent>('Student', studentSchema);