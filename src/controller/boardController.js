export const boardInput = async (req, res) => {
    const { title, content } = req.body; // 폼 데이터에서 제목과 내용 가져오기
    const file = req.file; // 업로드된 파일 가져오기
    const fileName = file ? file.filename : null; // 파일 이름 추출
    const filePath = file ? file.path : null; // 임시 파일의 경로 추출

    // 이후 업로드된 파일과 함께 필요한 작업을 수행하세요.
    console.log(fileName); // 파일 이름 출력
    console.log(filePath); // 파일의 임시 경로 출력
}