import express from "express";
import cors from "cors";
import courseRouter from "./controller/courseRouter.js";
import webRootViewRouter from "./controller/web/webRootViewRouter.js";
import authRouter from "./controller/authRouter.js";

const app = express();

/**
 * 템플릿 뷰 엔진을 ejs로 설정합니다
 * ejs는 HTML을 동적으로 생성하기 위해 사용하는 템플릿 엔진입니다.
 */
app.set("view engine", "ejs");
/**
 * view의 위치를 설정합니다.
 */
app.set("views", process.cwd() + "/src/client/html");

/**
 * CORS (Cross-Origin Resource Sharing)는 웹 페이지의 요청 도메인과 응답 도메인이 다를 때
 * 안전하게 요청을 처리할 수 있도록 하는 웹 브라우저의 보안 기술입니다.
 * 프론트 서버를 따로 사용시 (예: React, Vue 등) ALLOWED_ORIGINS 배열에 추가해야 합니다.
 */
const ALLOWED_ORIGINS = [
  "https://master--candid-halva-4d19f5.netlify.app", 
  "http://localhost:3000"
];
app.use(cors({
  origin: ALLOWED_ORIGINS,
  method: "GET, POST, PUT, DELETE, PATCH",
  credentials: true,
}));

/**
 * express.json() 미들웨어를 사용하여 들어오는 요청의 JSON 본문을 파싱합니다.
 * 이를 통해 req.body로 JSON 데이터에 접근할 수 있습니다.
 */
app.use(express.json());

/**
 * express.urlencoded() 미들웨어는 URL-encoded 데이터를 파싱합니다.
 * 이 미들웨어는 폼 데이터(form data)를 처리할 때 주로 사용됩니다.
 */
app.use(express.urlencoded({ extended: true }));

app.use("/css", express.static("src/client/css"));
app.use("/js", express.static("src/client/js"));
app.use("/file", express.static("src/client/file"));

// api
app.use("/api/auth", authRouter);
app.use("/api/course", courseRouter);

// web
app.use("/", webRootViewRouter)


export default app;
