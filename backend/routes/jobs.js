const express = require("express");
const pool = require("../db"); // Koneksi database PostgreSQL
const { authMiddleware, checkRole } = require("./auth"); // Middleware JWT Auth dan checkRole dari auth.js
const router = express.Router();

// ✅ [GET] Ambil semua jobs
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM jobs ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Error fetching jobs:", err.message);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

// ✅ [POST] Tambah job baru (Hanya untuk Admin)
router.post("/", authMiddleware, checkRole('admin'), async (req, res) => {
  const { title, company, location, salary } = req.body;
  if (!title || !company || !location || !salary) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO jobs (title, company, location, salary) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, company, location, salary]
    );
    res.status(201).json({ message: "Job added!", job: result.rows[0] });
  } catch (err) {
    console.error("❌ Error adding job:", err.message);
    res.status(500).json({ error: "Failed to add job" });
  }
});

// ✅ [PUT] Update job berdasarkan ID (Hanya untuk Admin)
router.put("/:id", authMiddleware, checkRole('admin'), async (req, res) => {
  const { id } = req.params;
  const { title, company, location, salary } = req.body;
  if (!title || !company || !location || !salary) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const result = await pool.query(
      "UPDATE jobs SET title=$1, company=$2, location=$3, salary=$4 WHERE id=$5 RETURNING *",
      [title, company, location, salary, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.json({ message: "Job updated!", job: result.rows[0] });
  } catch (err) {
    console.error("❌ Error updating job:", err.message);
    res.status(500).json({ error: "Failed to update job" });
  }
});

// ✅ [DELETE] Hapus job berdasarkan ID (Hanya untuk Admin)
router.delete("/:id", authMiddleware, checkRole('admin'), async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("DELETE FROM jobs WHERE id=$1 RETURNING *", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.json({ message: "Job deleted successfully!" });
  } catch (err) {
    console.error("❌ Error deleting job:", err.message);
    res.status(500).json({ error: "Failed to delete job" });
  }
});

module.exports = router;
