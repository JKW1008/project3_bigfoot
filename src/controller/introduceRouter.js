import express from "express";
import { getArtsandScienceList } from "./introduceController";

const introduceRouter = express.Router();

// introduceRouter.get("/introduce", getArtsandScienceList);
introduceRouter.get("/", getArtsandScienceList);
  

export default introduceRouter;
