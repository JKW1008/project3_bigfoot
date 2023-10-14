const accessToken = localStorage.getItem("accessToken");
if (!accessToken) {
    window.location.href = "/login?error=need_login";
}

const goList = document.querySelector("#goList");
const board_title = document.querySelector("#board_title");
const board_content = document.querySelector("#board_content");
const board_file = document.querySelector("#board_file");

const boardInput = async () => {
    const title = board_title.value;
    const content = board_content.value;

    if (title == "") {
        return msgAlert("center", "제목을 입력해 주세요.", "error");
    }

    if (content == "") {
        return msgAlert("center", "내용을 입력해 주세요.", "error");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("file", board_file.files[0]);

    try {
        const response = await fetch("/api/board/input", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: formData, // Use the FormData object here
        });

        if (response.status == 200) {
            msgAlert("center", "게시물 등록 성공", "success");
            setTimeout(() => {
                window.location.href = "/board";
            }, 1000);
        }  else if (response.status == 409) {
            return msgAlert("center", "게시물 등록 실패", "error");
        } else {
            return msgAlert("center", "서버 통신 오류", "error");
        }
    } catch (error) {
        console.error("Error:", error);
        bottomMsgAlert("서버 통신 오류", "error");
    }
};

goList.addEventListener("click", () => {
    window.location.href = "/board";
});

const board_input = document.querySelector("#board_input");
board_input.addEventListener("click", boardInput);
