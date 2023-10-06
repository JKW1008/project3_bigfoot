import Exception from "../handler/Exception.js";
import ResponseBody from "../handler/ResponseBody.js";
import { getCourseListWitUser, updateCourseVisitedStatus } from "../service/courseService.js";


export const qrCheck = async (req, res) => {
  const user = req.user;
  const qrDto = req.body;
  try {
    await updateCourseVisitedStatus({ user, ...qrDto });
    return res.status(200).json(new ResponseBody(200, "success", "방문 완료", ""));
  } catch (e) {
    console.error(e);
    if (e.statusCode) return res.status(e.statusCode).json({ statusCode: e.statusCode, statusText : e.statusText, message: e.message, data : e.data = "" });
    else return res.status(Exception.INTERNAL_SERVER_ERROR.statusCode).json(Exception.INTERNAL_SERVER_ERROR);
  }
};

export const getCourseList = async (req, res) => {
  try {
    const user = req.user;
    const courseListDto = await getCourseListWitUser(user);
    return res.status(200).json(new ResponseBody(200, "success", "코스 리스트 전송 완료", courseListDto));
  } catch (e) {
    console.error(e);
    if (e.statusCode) return res.status(e.statusCode).json({ statusCode: e.statusCode, statusText : e.statusText, message: e.message, data : e.data = "" });
    else return res.status(500).json(Exception.INTERNAL_SERVER_ERROR);
  }
}
