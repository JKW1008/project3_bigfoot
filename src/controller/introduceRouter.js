import express from "express";
import { containCourse, getArtsandScienceList } from "./introduceController";
import { isAuth } from "../middleware/auth";

const introduceRouter = express.Router();

// introduceRouter.get("/introduce", getArtsandScienceList);
introduceRouter.get("/", getArtsandScienceList);
introduceRouter.post("/", isAuth, containCourse);

export default introduceRouter;
