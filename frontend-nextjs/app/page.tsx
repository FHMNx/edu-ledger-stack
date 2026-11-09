"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Student {
  _id: string;
  studentId: string;
  firstName: string;
  lastName: string;
  email: string;
  course: string;
  batch: string;
  age: number;
}

export default function Home() {

  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("http://localhost:5000/students");
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, [])


  //DELETE STUDENT
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this student?");
    if (!confirmDelete) return;
    try {
      const response = await fetch(`http://localhost:5000/students/${id}`, {
        method: "DELETE"
      })
      if (!response.ok) {
        throw new Error("Failed to delete student");
      }

      const remainingStudents = students.filter(function (student) {
        return student._id !== id;
      })
      setStudents(remainingStudents);

    } catch (error) {
      console.error("Error deleting student:", error);
      alert("Failed to delete the student.");
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">

        {/* HEADER SECTION */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Student Dashboard</h1>
          <Link href={'/add-student'}>
            <button className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-md font-medium transition-colors cursor-pointer">+ Add New Student</button>
          </Link>
        </div>

        {/* DATA TABLE */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200 text-gray-600">
                <th className="p-4 font-semibold">Student ID</th>
                <th className="p-4 font-semibold">Name</th>
                <th className="p-4 font-semibold">Email</th>
                <th className="p-4 font-semibold">Course</th>
                <th className="p-4 font-semibold">Batch</th>
                <th className="p-4 font-semibold">Age</th>
                <th className="p-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    Loading students...
                  </td>
                </tr>
              ) : students.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    No students found. Add one to get started.
                  </td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={student._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4 font-medium text-gray-800">{student.studentId}</td>
                    <td className="p-4 text-gray-600">{student.firstName} {student.lastName}</td>
                    <td className="p-4 text-gray-600">{student.email}</td>
                    <td className="p-4 text-gray-600">{student.course}</td>
                    <td className="p-4 text-gray-600">{student.batch}</td>
                    <td className="p-4 text-gray-600">{student.age}</td>
                    <td className="p-4 text-center space-x-4">
                      {/* EDIT */}
                      <Link href={`/edit-student/${student._id}`}>
                        <button className="text-blue-500 hover:text-blue-700 font-medium transition-colors cursor-pointer">Edit</button>
                      </Link>

                      {/* DELETE */}
                      <button
                        onClick={() => handleDelete(student._id)}
                        className="text-red-500 hover:text-red-700 font-medium transition-colors cursor-pointer">Delete
                      </button>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </main>
  );
}