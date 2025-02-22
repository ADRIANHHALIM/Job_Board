// app/Register.tsx
"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Register() {
    const { register, handleSubmit } = useForm();
    const router = useRouter();

    const onSubmit = async (data: any) => {
        try {
            await axios.post("http://localhost:5001/auth/register", data);
            alert("Registration successful! Please login.");
            router.push("/login");
        } catch (error) {
            alert("Registration failed! Please try again.");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Register</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input
                    type="text"
                    {...register("name", { required: true })}
                    placeholder="Full Name"
                    className="w-full p-2 border rounded"
                />
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
                <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
                    Register
                </button>
            </form>
        </div>
    );
}
