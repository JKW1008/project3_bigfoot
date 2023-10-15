import express from "express";
import { boardInput } from "./boardController";
import { isAuth } from "../middleware/auth";
import multer from "multer";

const boardRouter = express.Router();

// 파일 업로드를 처리하는 multer 설정
const storage = multer.memoryStorage(); // 메모리에 파일을 저장
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 40 * 1024 * 1024, // 파일 크기 제한: 10MB
    },
});

boardRouter.post("/input", isAuth, upload.single("file"), boardInput); // "file"은 HTML 폼 필드 이름과 일치해야 함

export default boardRouter;
