import { Router } from "express";
import { generateTrip } from "../controllers/AI.controllers.js";

const router = new Router();

router.route('/generate-trip').post(generateTrip);


export default router;