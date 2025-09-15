import { Router } from "express";
import { login, register} from "../controllers/auth.controller.js";
import { updateProfile } from "../controllers/profile.controller.js";
const router = Router();

router.post("/login", login);
router.post("/register", register);
router.patch("/update", updateProfile);

export default router;
