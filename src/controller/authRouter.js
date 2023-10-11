import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { Strategy as KakaoStrategy } from 'passport-kakao';
import { handleKakaoLogin, isAuth } from "../middleware/auth.js";
import { authMe, joinUser, loginUser } from "./authController.js";

const clientId = process.env.CLIENT_ID || "";
const callback = "/api/auth/kakao/callback"

const authRouter = express.Router();

passport.use(new KakaoStrategy({ clientID: clientId, callbackURL: callback }, handleKakaoLogin ));

authRouter.get("/kakao", passport.authenticate("kakao", { session: false }));
authRouter.get("/kakao/callback", (req, res, next) => {
  passport.authenticate("kakao", { session: false }, async (err, user, info) => {
    if (info) {
      console.error(info)
      return res.redirect("/login?error=" + info);
    } else if (!user) {
      console.error("not found user")
      return res.redirect("/login?error=sns_login_failed");
    } else {
      // access token 만들기
      const accessToken = jwt.sign({ id: user.user_id }, process.env.SECRET_KEY, { expiresIn: process.env.JWT_EXPIRE });
      // console.log(accessToken);
      return res.redirect("/login/callback?accessToken=" + accessToken);
    }
  })(req, res, next);
});
authRouter.get("/login/callback", (req, res) => res.redirect("/"));
authRouter.post("/join", joinUser)
authRouter.post("/login", loginUser)
authRouter.post("/token/check", isAuth, authMe)

export default authRouter;
