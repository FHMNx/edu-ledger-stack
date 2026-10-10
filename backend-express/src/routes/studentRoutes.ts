import express from "express";
import { createStudent, deleteStudent, getStudent, updateStudent } from "../controllers/studentController.js";

const router = express.Router();

router.post('/', createStudent);
router.get('/', getStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

export default router;