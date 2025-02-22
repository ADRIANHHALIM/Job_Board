require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./db"); // ✅ GUNAKAN db.js, JANGAN BUAT POOL BARU!
const authRoutes = require("./routes/auth").router; // Menggunakan router dari auth.js
const jobRoutes = require("./routes/jobs");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/jobs", jobRoutes);

// Jalankan server
const PORT = process.env.PORT || 5001;
app.listen(PORT, async () => {
  try {
    const dbTest = await pool.query("SELECT NOW()");
    console.log(`✅ Database Connected! Waktu: ${dbTest.rows[0].now}`);
  } catch (err) {
    console.error("❌ Database Connection Error:", err.message);
  }
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
