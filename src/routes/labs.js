import express from "express";
import { protect } from "../utils/jwt.js";
import {
  listLabs,
  createSession,
  listSessions,
  stopSession,
} from "../controllers/labController.js";

const router = express.Router();

router.get("/", protect, listLabs);
router.get("/sessions", protect, listSessions);
router.post("/sessions", protect, createSession);
router.delete("/sessions/:id", protect, stopSession);

export default router;
