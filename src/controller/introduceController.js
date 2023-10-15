import { ContainCourse, allMyCourse, delet_myCourse, getArtsandScience } from "../service/introduceService"
import ResponseBody from "../handler/ResponseBody.js";
import Exception from "../handler/Exception";

export const getArtsandScienceList = async (req, res) => {
    try {
        const coursArray =  await getArtsandScience();    
        return res.status(200).json(new ResponseBody(200, "success", "코스 리스트 전송 완료", coursArray.history_and_culture));
      } catch (e) {
        console.error(e);
        if (e.statusCode) return res.status(e.statusCode).json({ statusCode: e.statusCode, statusText : e.statusText, message: e.message, data : e.data = "" });
        else return res.status(500).json(Exception.INTERNAL_SERVER_ERROR);
      }
}

export const containCourse = async (req, res) => {
  const user = req.user.user_id;
  const courseIdx = req.body.idx;
  const courseName = req.body.name;
  const tableName = req.body.tableName;
  const lat = req.body.lat;
  const lon = req.body.lon;

  try {
    const result = await ContainCourse(user, tableName, courseIdx, courseName, lat, lon);

    if (result === true) {
      return res.status(200).json(new ResponseBody(200, "success", "장바구니 저장 완료"));
    } else if (result === "Data already exists") {
      return res.status(400).json(new ResponseBody(400, "failed", "이미 저장된 코스 입니다."));
    }
  } catch (e) {
    console.error(e);
    if (e.statusCode) return res.status(e.statusCode).json({ statusCode: e.statusCode, statusText: e.statusText, message: e.message, data: e.data = "" });
    else return res.status(500).json(Exception.INTERNAL_SERVER_ERROR);
  }
}

export const getallMyCourse = async (req, res) => {
  try{
    const user = req.user.user_id;
    const allmycourse = await allMyCourse(user);
    // console.log(allmycourse);
    res.status(200).json({
      success: true,
      data: allmycourse, // allmycourse에 들어 있는 데이터를 프론트로 전달
    });
  } catch (e) {
    console.error(e);
    if (e.statusCode) return res.status(e.statusCode).json({ statusCode: e.statusCode, statusText: e.statusText, message: e.message, data: e.data = "" });
    else return res.status(500).json(Exception.INTERNAL_SERVER_ERROR);
  }
}

export const deleteMycourse = async (req, res) => {
  try {
    const idx = req.body.idx;
    const dmycourse = await delet_myCourse(idx);
    
    if (dmycourse === true) {
      return res.status(200).json(new ResponseBody(200, "success", "코스 삭제 성공"));
    } else if (dmycourse === false) {
      return res.status(400).json(new ResponseBody(400, "failed", "존재하지 않습니다."));
    }
  } catch (e) {
    console.error(e);
    if (e.statusCode) return res.status(e.statusCode).json({ statusCode: e.statusCode, statusText: e.statusText, message: e.message, data: e.data = "" });
    else return res.status(500).json(Exception.INTERNAL_SERVER_ERROR);
  }
}