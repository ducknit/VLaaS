import http from "http";
import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/awsconfig.js";

dotenv.config();

// Environment variables
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

// Create HTTP server
const server = http.createServer(app);

// Connect to DynamoDB
connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`✅ Server running in ${NODE_ENV} mode on port ${PORT}`);
      console.log(`🌐 http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to DynamoDB:", err);
    process.exit(1);
  });

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("\n🛑 Shutting down server gracefully...");
  server.close(() => {
    console.log("✅ Server closed.");
    process.exit(0);
  });
});
