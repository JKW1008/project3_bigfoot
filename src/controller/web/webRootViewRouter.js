import express from "express";
import { getArtsandScience } from "../../service/introduceService";
import { detailPage } from "../detailController";
import { getBoardList } from "../../service/boardService";
import { boarddetail } from "../boardController";

const webRootViewRouter = express.Router();
// const data = require('../../../data/info.json');

webRootViewRouter.get("/", (req, res) => res.render("main"));
webRootViewRouter.get("/introduce", async (req, res) => {
    const coursArray = await getArtsandScience();
    res.render("introduce", {data : coursArray});
}); 
webRootViewRouter.get("/course", (req, res) => res.render("course"));
webRootViewRouter.get("/qr", (req, res) => res.render("qr"));
webRootViewRouter.get("/users", (req, res) => res.render("users"));
webRootViewRouter.get("/join", (req, res) => res.render("joinForm"));
webRootViewRouter.get("/login", (req, res) => res.render("loginForm"));
webRootViewRouter.get("/login/callback", (req, res) => res.render("loginCallback"));
webRootViewRouter.get("/detail", detailPage);
webRootViewRouter.get("/tutorialCourse", (req, res) => res.render("tutorialCourse"));
webRootViewRouter.get("/tutorialQr", (req, res) => res.render("tutorialQr"));
webRootViewRouter.get("/tutorialStamp", (req, res) => res.render("tutorialStamp"));
webRootViewRouter.get("/tutorialRecommendation", (req, res) => res.render("tutorialRecommendation"));
webRootViewRouter.get("/board", async (req, res) => {
    const boardList = await getBoardList();
    res.render("board", {data : boardList});
}); 
webRootViewRouter.get("/boardWriting", (req, res) => res.render("boardWriting"));
webRootViewRouter.get("/boardListDatail", boarddetail);

export default webRootViewRouter;

