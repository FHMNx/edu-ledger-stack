"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { HtmlContext } from "next/dist/server/route-modules/pages/vendored/contexts/entrypoints";

export default function AddStudentPage() {

    const router = useRouter();

    const [formData, setFormData] = useState({
        studentId: "",
        firstName: "",
        lastName: "",
        email: "",
        age: "",
        course: "",
        batch: "",
    })

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch("http://localhost:5000/students", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    age: Number(formData.age),
                })
            })

            if (!response.ok) {
                throw new Error("Failed to save student");
            }

            router.push("/");
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to save the student. Check the console for details.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <main className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8">

                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">Add New Student</h1>
                    <p className="text-gray-600 mt-1">Enter the student details below to create a new record.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Row 1: Student ID */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="e.g., JIAT-2026-004"
                            name="studentId"
                            value={formData.studentId}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Row 2: First Name & Last Name */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="First Name"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="Last Name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    {/* Row 3: Email & Age */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input
                                type="email"
                                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="email@example.com"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                            <input
                                type="number"
                                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="e.g., 22"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                required
                                min="1"
                            />
                        </div>
                    </div>

                    {/* Row 4: Course & Batch */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="e.g., Software Engineering"
                                name="course"
                                value={formData.course}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Batch</label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="e.g., SE-Batch-42"
                                name="batch"
                                value={formData.batch}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4 border-t border-gray-200">
                        <Link
                            href="/"
                            className="w-1/2 text-center px-4 py-2 text-gray-600 bg-red-800 hover:bg-red-900 font-medium hover:text-gray-800 transition-colors rounded-md text-white  hover:text-white"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-1/2 bg-blue-800 hover:bg-blue-900 text-white px-6 py-2 rounded-md font-medium transition-colors cursor-pointer"
                        >
                            {isSubmitting ? "Saving.." : " Save Student"}
                        </button>
                    </div>

                </form>

            </div>
        </main>
    );
}