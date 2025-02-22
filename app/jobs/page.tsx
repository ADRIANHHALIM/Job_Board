"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: number;
  category: string;
  postedAt: string;
};

export default function JobList() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    axios.get("http://localhost:5001/jobs").then((response) => {
      setJobs(response.data);
    });
  }, []);

  // Hapus Pekerjaan
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this job?")) return;
    try {
      await axios.delete(`http://localhost:5001/jobs/${id}`);
      setJobs(jobs.filter((job) => job.id !== id));
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Failed to delete job.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-900 dark:text-white">
        🚀 Explore Your Next Opportunity
      </h2>

      {/* Add Job Button */}
      <div className="flex justify-end mb-6">
        <Link href="/jobs/create">
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-all">
            + Post a Job
          </button>
        </Link>
      </div>

      {jobs.length === 0 ? (
        <p className="text-center text-gray-500">No jobs available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="relative p-6 border rounded-xl shadow-lg bg-gradient-to-r from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 transition transform hover:scale-105 hover:shadow-2xl backdrop-blur-lg"
            >
              {/* Job Category */}
              <span className="absolute top-4 right-4 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-semibold">
                {job.category}
              </span>

              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {job.title}
              </h3>

              {/* Company & Location */}
              <p className="text-gray-600 dark:text-gray-300 flex items-center mb-1">
                🏢 <span className="ml-2">{job.company}</span>
              </p>
              <p className="text-gray-600 dark:text-gray-300 flex items-center mb-3">
                📍 <span className="ml-2">{job.location}</span>
              </p>

              {/* Salary Badge */}
              <div className="mb-3 inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                💰 {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(job.salary)}
              </div>

              {/* Posted Date */}
              <p className="text-sm text-gray-500 dark:text-gray-400">📅 Posted on: {new Date(job.postedAt).toLocaleDateString()}</p>

              {/* Action Buttons */}
              <div className="mt-5 flex flex-col space-y-3">
                <Link href={`/jobs/edit/${job.id}`}>
                  <button className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition flex items-center justify-center space-x-2">
                    ✏️ <span>Edit</span>
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(job.id)}
                  className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition flex items-center justify-center space-x-2"
                >
                  🗑️ <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
