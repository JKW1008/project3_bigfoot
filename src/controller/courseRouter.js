import express from "express";
import { qrCheck } from "./courseController.js";
import { isAuth } from "../middleware/auth.js";
import { qrForm } from "../middleware/validation.js";

const courseRouter = express.Router();

courseRouter.post("/visit", qrForm, isAuth, qrCheck);

export default courseRouter;
