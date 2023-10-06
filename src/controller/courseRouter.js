import express from "express";
import { getCourseList, qrCheck } from "./courseController.js";
import { isAuth } from "../middleware/auth.js";
import { qrForm } from "../middleware/validation.js";

const courseRouter = express.Router();

courseRouter.get("/", isAuth, getCourseList);
courseRouter.post("/", qrForm, isAuth, qrCheck);

export default courseRouter;
