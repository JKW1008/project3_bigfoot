import Exception from "../handler/Exception.js";
import ResponseBody from "../handler/ResponseBody.js";
import { chkVisited } from "../service/courseService.js";


export const qrCheck = async (req, res) => {
  const user = req.user.user_id;
  const qr = req.body.qrCode;
  // console.log(qr);
  try {
      const chk = await chkVisited(user, qr);
      if(chk == true){
        return res.status(200).json(new ResponseBody(200, "success", "방문 완료"));
      } else if (chk == false) {
        return res.status(400).json(new ResponseBody(200, "success", "방문 완료"));
      }
  } catch (e) {
    console.error (e);
    if(e.statusCode) return res.status(e.statusCode).json({ statusCode: e.statusCode, statusText : e.statusText, message: e.message, data : e.data = ""});
    else return res.status(Exception.INTERNAL_SERVER_ERROR.statusCode).json(Exception.INTERNAL_SERVER_ERROR);
  }
};


