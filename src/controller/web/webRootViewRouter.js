import express from "express";

const webRootViewRouter = express.Router();
const data = require('../../../data/info.json');

webRootViewRouter.get("/", (req, res) => res.render("main"));
webRootViewRouter.get("/introduce", (req, res) => res.render("introduce", {data})); 
webRootViewRouter.get("/course", (req, res) => res.render("course"));
webRootViewRouter.get("/qr", (req, res) => res.render("qr"));
webRootViewRouter.get("/users", (req, res) => res.render("users"));
webRootViewRouter.get("/join", (req, res) => res.render("joinForm"));
webRootViewRouter.get("/login", (req, res) => res.render("loginForm"));
webRootViewRouter.get("/login/callback", (req, res) => res.render("loginCallback"));
webRootViewRouter.get("/detail", (req, res) => res.render("detail"));
webRootViewRouter.get("/tutorialCourse", (req, res) => res.render("tutorialCourse"));
webRootViewRouter.get("/tutorialQr", (req, res) => res.render("tutorialQr"));
webRootViewRouter.get("/tutorialStamp", (req, res) => res.render("tutorialStamp"));
webRootViewRouter.get("/tutorialRecommendation", (req, res) => res.render("tutorialRecommendation"));
webRootViewRouter.get("/board", (req, res) => res.render("board"));
webRootViewRouter.get("/boardWriting", (req, res) => res.render("boardWriting"));
webRootViewRouter.get("/boardListDatail", (req, res) => res.render("boardListDatail"));

export default webRootViewRouter;

