const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db");
require("dotenv").config();

const router = express.Router();

// 🔐 REGISTER USER
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  try {
    // Cek apakah email sudah ada
    const checkUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (checkUser.rows.length > 0) {
      return res.status(400).json({ error: "Email already registered!" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan user ke database dengan role default
    const result = await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role",
      [name, email, hashedPassword, 'user'] // Set role default ke 'user'
    );

    res.json({ message: "User registered successfully!", user: result.rows[0] });
  } catch (error) {
    console.error("❌ Error registering user:", error.message);
    res.status(500).json({ error: "Error registering user" });
  }
});

// 🔑 LOGIN USER
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required!" });
  }

  try {
    console.log("📌 Mencari user dengan email:", email);
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (result.rows.length === 0) {
      console.log("⚠️  User tidak ditemukan!");
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = result.rows[0];
    console.log("✅ User ditemukan:", user);

    console.log("🔑 Memeriksa password...");
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("❌ Password salah!");
      return res.status(401).json({ error: "Invalid email or password" });
    }

    console.log("🔐 Password benar, membuat token JWT...");
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    console.log("✅ Login berhasil!");
    res.json({ message: "Login successful!", token });
  } catch (error) {
    console.error("❌ Error logging in:", error.message);
    res.status(500).json({ error: "Error logging in" });
  }
});

// Middleware untuk autentikasi JWT
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Akses ditolak" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Token tidak valid" });
    req.user = decoded; // Simpan data user yang sudah login
    next();
  });
};

// Middleware untuk memeriksa peran pengguna
const checkRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ error: "Access denied, insufficient permissions." });
    }
    next();
  };
};

// Ekspor router dan middleware
module.exports = { router, authMiddleware, checkRole };
