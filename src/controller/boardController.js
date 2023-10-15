export const boardInput = async (req, res) => {
    const { title, content } = req.body; // 폼 데이터에서 제목과 내용 가져오기
    const file = req.file; // 업로드된 파일 가져오기

    // 이후 업로드된 파일과 함께 필요한 작업을 수행하세요.
console.log(req.user);
    console.log(req.body); // 내용 출력
console.log(req.file);
    // 나머지 라우트 핸들러 로직을 계속 진행하세요.
}