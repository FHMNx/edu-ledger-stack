import type { Request, Response } from "express";
import Student from "../models/Student.js";

export const createStudent = async (req: Request, res: Response) => {
    try {
        const newStudent = new Student(req.body);
        const savedStudent = await newStudent.save();
        res.status(201).json(savedStudent);
    } catch (error) {
        res.status(400).json({ message: "Failed to create student", error })
    }
}

export const getStudent = async (req: Request, res: Response) => {
    try {
        const student = await Student.find();
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve Student", error })
    }
}

