import type { Request, Response } from "express";
import Student from "../models/Student.js";
import { Mongoose } from "mongoose";

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

//GET INCLUDING SORTING AND FILTERING
export const getStudent = async (req: Request, res: Response) => {
    try {
        const { firstName, course, sortAge } = req.query;
        let query: any = {};

        if (firstName) {
            query.firstName = { $regex: firstName as string, $options: 'i' };
        }

        if (course) {
            query.course = { $regex: course as string, $options: 'i' };
        }

        let mongooseQuery = Student.find(query);
        if (sortAge) {
            const sortOrder = sortAge === 'desc' ? -1 : 1;   // In Mongoose, 1 is Ascending (youngest first), -1 is Descending (oldest first)
            mongooseQuery = mongooseQuery.sort({ age: sortOrder });
        }

        const students = await mongooseQuery;
        res.status(200).json(students);
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