import { Router } from "express";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { ROLES } from "../constants/roles";

const router = Router();

router.get("/", authMiddleware([ROLES.ADMIN, ROLES.USER]), getUsers);
router.get("/:id", authMiddleware([ROLES.ADMIN, ROLES.USER]), getUser);
router.post("/", authMiddleware([ROLES.ADMIN]), createUser);
router.put("/:id", authMiddleware([ROLES.ADMIN, ROLES.USER]), updateUser);
router.delete("/:id", authMiddleware([ROLES.ADMIN]), deleteUser);

export default router;
