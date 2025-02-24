"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center text-center"
      >
        {/* Gambar dengan ukuran proporsional */}
        <Image
          src="/workquest.png"
          alt="WorkQuest Logo"
          width={500}
          height={500}
          className="mb-6"
        />

        {/* Judul yang lebih proporsional */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-4xl font-bold mb-4 text-gray-800 max-w-xl"
        >
          Temukan Pekerjaan dengan Mudah bersama{" "}
          <span className="text-blue-500">WORKQUEST</span>
        </motion.h1>

        {/* Deskripsi dengan max-width agar lebih rapi */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-gray-600 mb-6 max-w-md"
        >
          Platform terbaik untuk mencari pekerjaan freelance dan menghubungkan
          pekerja dengan perusahaan yang membutuhkan talenta terbaik.
        </motion.p>

        {/* Tombol yang benar-benar sejajar di tengah */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="flex gap-4"
        >
          <button
            onClick={() => router.push("/login")}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
          <button
            onClick={() => router.push("/jobs")}
            className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
          >
            Lihat Pekerjaan
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
