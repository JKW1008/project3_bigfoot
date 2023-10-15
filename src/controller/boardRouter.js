import express from "express";
import { boardInput } from "./boardController";
import { isAuth } from "../middleware/auth";
import multer from "multer";
import path from "path";

const boardRouter = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'data/board')
    },
    filename: function (req, file, callback) {
        if (req.user) {
            const userId = req.user.user_id; // 사용자 ID를 가져옵니다.
            const timestamp = Date.now();
            const originalname = file.originalname;
            const extname = path.extname(originalname); // 확장자 추출

            // 새 파일 이름을 생성 (예시: userID_timestamp_originalname)
            const filename = `${userId}_${timestamp}${extname}`;

            callback(null, filename);
            
        } else {
            // 사용자가 로그인하지 않은 경우 오류 처리
            callback(new Error("사용자가 로그인하지 않았습니다."));
        }
    },
});

const upload = multer({ storage, limits: { fileSize: 40 * 1024 * 1024 } });

boardRouter.post("/input", isAuth, upload.single("file"), boardInput);

export default boardRouter;
