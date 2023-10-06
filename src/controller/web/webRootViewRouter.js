import express from "express";

const webRootViewRouter = express.Router();

webRootViewRouter.get("/", (req, res) => res.render("main"));
webRootViewRouter.get("/introduce", (req, res) => res.render("introduce"));
webRootViewRouter.get("/course", (req, res) => res.render("course"));
webRootViewRouter.get("/qr", (req, res) => res.render("qr"));
webRootViewRouter.get("/users", (req, res) => res.render("users"));

webRootViewRouter.get("/join", (req, res) => res.render("joinForm"))
webRootViewRouter.get("/login", (req, res) => res.render("loginForm"))
webRootViewRouter.get("/login/callback", (req, res) => res.render("loginCallback"));

export default webRootViewRouter;