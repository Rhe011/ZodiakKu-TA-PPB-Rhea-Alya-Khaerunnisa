// zodiakku-api/src/routes/zodiacRoutes.js

import { Router } from "express";
import { ZodiacController } from "../controllers/zodiacController.js";

const router = Router();

router.get("/", ZodiacController.getAll);
router.get("/:slug", ZodiacController.getDetail);

export default router;
