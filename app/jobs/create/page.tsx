"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function CreateJob() {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      await axios.post("http://localhost:5001/jobs", data);
      alert("✅ Job posted successfully!");
      reset();
    } catch (error) {
      alert("❌ Failed to post job!");
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <motion.div 
      className="max-w-lg mx-auto p-8 bg-white dark:bg-gray-900 shadow-xl rounded-3xl mt-10 backdrop-blur-md border border-gray-200/30 dark:border-gray-700/30"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white text-center">
        🚀 Create a Job Post
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <InputField label="Job Title" name="title" register={register} required />
        <TextareaField label="Job Description" name="description" register={register} required />
        <InputField label="Company Name" name="company" register={register} required />
        <InputField label="Location" name="location" register={register} required />
        <InputField label="Salary (USD)" name="salary" register={register} type="number" required />

        

        {/* Submit Button with Animation */}
        <motion.button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center hover:scale-105 transition shadow-lg"
          whileTap={{ scale: 0.95 }}
        >
          {loading ? <Loader2 className="animate-spin w-5 h-5 mr-2" /> : "🚀 Post Job"}
        </motion.button>
      </form>
    </motion.div>
  );
}

// Reusable Input Field with Animated Border
function InputField({ label, name, register, type = "text", required }: any) {
  return (
    <div className="relative">
      <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">{label}</label>
      <motion.input
        type={type}
        {...register(name, { required })}
        className="w-full p-3 border rounded-xl bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-400 transition shadow-md"
        whileFocus={{ scale: 1.02, borderColor: "#3b82f6" }}
      />
    </div>
  );
}

// Reusable Textarea Field with Animated Border
function TextareaField({ label, name, register, required }: any) {
  return (
    <div className="relative">
      <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">{label}</label>
      <motion.textarea
        {...register(name, { required })}
        className="w-full p-3 border rounded-xl bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-400 transition shadow-md"
        rows={4}
        whileFocus={{ scale: 1.02, borderColor: "#3b82f6" }}
      />
    </div>
  );
}
