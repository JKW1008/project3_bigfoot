import express from "express";
import { getArtsandScienceList } from "./introduceController";

const introduceRouter = express.Router();

introduceRouter.get("/introduce", getArtsandScienceList);
introduceRouter.get("/introduce", (req, res) => {
    console.log("Request to /introduce route");
    getArtsandScienceList(req, res);
  });
  

export default introduceRouter;
