import type { Request, Response } from "express";
import Student from "../models/Student.js";

export const createStudent = async (req: Request, res: Response) => {
    try {
        const newStudent = new Student(req.body);
        const savedStudent = await newStudent.save();
       res.status(201).json(savedStudent);
    } catch (error) {
        res.status(400).json({message : "Failed to create student" , error})
    }
}

