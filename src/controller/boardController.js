import ResponseBody from "../handler/ResponseBody";
import { board_input, getBoardDetail } from "../service/boardService";

export const boardInput = async (req, res) => {
    const user_id = req.user.user_id;
    const { title, content } = req.body; // 폼 데이터에서 제목과 내용 가져오기
    const file = req.file; // 업로드된 파일 가져오기
    // const fileName = file ? file.filename : null; // 파일 이름 추출
    const filePath = file ? file.path : null; // 임시 파일의 경로 추출

    try {
        const fullFilePath = '/' + filePath; // 경로와 파일 이름 결합
        const result = await board_input(user_id, title, content, fullFilePath);

        if (result === true) {
            return res.status(200).json(new ResponseBody(200, "success", "후기 작성 완료 완료"));
        }
    } catch (error) {
        console.error("Error in boardInput: ", error);
        throw error;
    }
}

export const boarddetail = async (req, res) => {
    const idx = req.query.idx;
    const data = await getBoardDetail(idx);
    console.log(data);
    return res.render("boardListDatail", { data : data });
}