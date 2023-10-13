import { getArtsandScience } from "../service/introduceService"
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
  const user = req.user;
  console.log(user);
  // console.log(user);
  // console.log("================");
  // try {
  //   await ({ user, ...qrDto });
  //   return res.status(200).json(new ResponseBody(200, "success", "방문 완료", ""));
  // } catch (e) {
  //   console.error(e);
  //   if (e.statusCode) return res.status(e.statusCode).json({ statusCode: e.statusCode, statusText : e.statusText, message: e.message, data : e.data = "" });
  //   else return res.status(Exception.INTERNAL_SERVER_ERROR.statusCode).json(Exception.INTERNAL_SERVER_ERROR);
  // }
}