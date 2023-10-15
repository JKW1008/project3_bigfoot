import express from "express";
import {  containCourse, deleteMycourse, getArtsandScienceList, getallMyCourse } from "./introduceController";
import { isAuth } from "../middleware/auth";

const introduceRouter = express.Router();

// introduceRouter.get("/introduce", getArtsandScienceList);
introduceRouter.get("/", getArtsandScienceList);

introduceRouter.get("/contain", isAuth, getallMyCourse);


introduceRouter.post("/delte", deleteMycourse);
introduceRouter.post("/", isAuth, containCourse);

export default introduceRouter;
