"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "./AuthContext"; // Ensure this path is correct
import { useRouter } from "next/navigation";

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function Login() {
  const { register, handleSubmit } = useForm<LoginFormInputs>();
  const { login } = useAuth();
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      // Simulasi login, ganti dengan autentikasi yang sesuai
      const user = { name: data.email }; // Ambil informasi user sesuai autentikasi
      login(user);
      router.push("/jobs"); // Redirect to jobs page on successful login
    } catch (error) {
      alert("Login failed! Please check your credentials.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="email"
          {...register("email", { required: true })}
          placeholder="Email"
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          {...register("password", { required: true })}
          placeholder="Password"
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}