"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "../AuthContext"; // Pastikan jalurnya benar
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

interface RegisterFormInputs {
  email: string;
  password: string;
}

export default function Register() {
  const { register, handleSubmit } = useForm<RegisterFormInputs>();
  const { login } = useAuth(); // Otomatis login setelah register
  const router = useRouter();

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    try {
      const user = { name: data.email }; // Simulasi user
      login(user);
      router.push("/jobs");
    } catch (error) {
      alert("Registration failed! Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors">
      <motion.div
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-[90%] max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center">
          Create an Account
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
          Sign up to find your dream job
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email Input */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Enter your email"
              className="w-full p-3 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 outline-none transition"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="Enter your password"
              className="w-full p-3 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 outline-none transition"
            />
          </div>

          {/* Register Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold p-3 rounded-lg shadow-lg transition"
          >
            Sign Up
          </motion.button>
        </form>

        {/* Link to Login */}
        <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
