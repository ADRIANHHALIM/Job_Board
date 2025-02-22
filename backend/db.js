const { Pool } = require("pg");
require("dotenv").config();

console.log("🔍 Menggunakan database:", process.env.DB_NAME);
console.log("🔗 DATABASE_URL:", process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || null,
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "yourpassword",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  database: process.env.DB_NAME || "job_board",
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});
module.exports = pool;
