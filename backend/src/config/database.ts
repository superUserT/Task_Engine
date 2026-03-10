import dotenv from "dotenv";
import { Pool } from "pg";

// Load environment variables from the .env file
dotenv.config();

/**
 * A connection pool for the PostgreSQL database.
 * It uses environment variables for configuration.
 */
const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432", 10),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Optional: Add a listener to log when a client connects to the database.
// This is useful for debugging connection issues.
pool.on("connect", () => {
  console.log("Database connection pool created successfully.");
});

// Export the pool for use in other parts of the application (e.g., services or repositories).
export default pool;
