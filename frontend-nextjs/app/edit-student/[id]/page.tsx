"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

function EditStudentForm() {
  const params = useParams();
  const studentIdToEdit = params?.id as string;
  
  const router = useRouter();

  const [formData, setFormData] = useState({
    studentId: "",
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    course: "",
    batch: "",
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!studentIdToEdit) return;

    const fetchSingleStudent = async () => {
      try {
        const response = await fetch(`http://localhost:5000/students/${studentIdToEdit}`);
        
        if (response.status === 404) {
          alert("Student not found! Please make sure your Express server is restarted and the GET /:id route exists.");
          setIsLoading(false);
          return;
        }

        if (!response.ok) throw new Error("Failed to fetch student details");
        
        const data = await response.json();
        
        setFormData({
          studentId: data.studentId,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          age: data.age.toString(),
          course: data.course,
          batch: data.batch,
        });
      } catch (error) {
        console.error("Error fetching student:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSingleStudent();
  }, [studentIdToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const response = await fetch(`http://localhost:5000/students/${studentIdToEdit}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          age: Number(formData.age), 
        }),
      });

      if (!response.ok) throw new Error("Failed to update student");

      router.push("/"); 
    } catch (error) {
      console.error("Error updating student:", error);
      alert("Failed to update student.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-gray-500 text-lg">Loading student data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Edit Student</h1>
        <p className="text-gray-600 mt-1">
          Updating record for database ID: <span className="font-mono bg-gray-100 px-1 rounded">{studentIdToEdit}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
          <input 
            type="text" name="studentId" value={formData.studentId} onChange={handleChange} required
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none" 
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input 
              type="text" name="firstName" value={formData.firstName} onChange={handleChange} required
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input 
              type="text" name="lastName" value={formData.lastName} onChange={handleChange} required
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none" 
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" name="email" value={formData.email} onChange={handleChange} required
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
            <input 
              type="number" name="age" value={formData.age} onChange={handleChange} required min="1"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none" 
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
            <input 
              type="text" name="course" value={formData.course} onChange={handleChange} required
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Batch</label>
            <input 
              type="text" name="batch" value={formData.batch} onChange={handleChange} required
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none" 
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4 border-t border-gray-100">
          <Link href="/" className="px-4 py-2 text-gray-600 font-medium hover:text-gray-800 transition-colors">
            Cancel
          </Link>
          <button 
            type="submit" disabled={isSaving}
            className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-2 rounded-md font-medium transition-colors disabled:bg-blue-400"
          >
            {isSaving ? "Saving..." : "Update Student"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function EditStudentPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <Suspense fallback={<div className="text-center py-20 text-gray-500">Loading page...</div>}>
        <EditStudentForm />
      </Suspense>
    </main>
  );
}