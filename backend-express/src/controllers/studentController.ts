import type { Request, Response } from "express";
import Student from "../models/Student.js";

//ADD
export const createStudent = async (req: Request, res: Response) => {
    try {
        const newStudent = new Student(req.body);
        const savedStudent = await newStudent.save();
        res.status(201).json(savedStudent);
    } catch (error) {
        res.status(400).json({ message: "Failed to create student", error })
    }
}

//GET
export const getStudent = async (req: Request, res: Response) => {
    try {
        const student = await Student.find();
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve Student", error })
    }
}

//UPDATE
export const updateStudent = async (req: Request, res: Response) => {
    try {
        const studentId = req.params.id;

        const updatedStudent = await Student.findByIdAndUpdate(
            studentId,
            req.body,
            {
                new: true,
                runValidators: true
            }
        )

        if (!updatedStudent) {
            res.status(404).json({ message: "student not found" });
            return;
        }

        res.status(200).json(updateStudent);
    } catch (error) {
        res.status(400).json({ message: "Failed to update student", error })
    }
}

//DELETE
export const deleteStudent = async (req: Request, res: Response) => {
    try {
        const studentId = req.params.id;
        const deletedStudent = await Student.findByIdAndDelete(studentId);

        if (!deletedStudent) {
            res.status(404).json({ message: "Student not found" });
            return;
        }

        res.status(200).json({ message: "Student successfully deleted" });
    } catch (error) {
        res.status(400).json({ message: "Failed to delete student", error });
    }
}