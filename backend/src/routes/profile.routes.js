import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  getPublicProfile,
  getPrivateProfile,
  updateProfile,
  deleteProfile
} from "../controllers/profile.controller.js";

const router = Router();

router.get("/public", getPublicProfile);

router.get("/private", authMiddleware, getPrivateProfile);

router.patch("/private/update", authMiddleware, updateProfile);
router.delete("/private/delete", authMiddleware, deleteProfile);

export default router;
