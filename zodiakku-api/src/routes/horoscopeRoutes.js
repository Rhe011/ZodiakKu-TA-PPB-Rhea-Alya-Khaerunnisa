// zodiakku-api/src/routes/horoscopeRoutes.js

import { Router } from "express";
import { HoroscopeController } from "../controllers/horoscopeController.js";

const router = Router();

router.get("/", HoroscopeController.getTodayList);
router.get("/:slug", HoroscopeController.getByZodiac);

export default router;
