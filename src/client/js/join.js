const joinBtn = document.getElementById("joinBtn");
const userIdInput = document.getElementById("userId");
const userPasswordInput = document.getElementById("userPassword");
const userNameInput = document.getElementById("userName");

const joinFetch = async () => {
  const userId = userIdInput.value;
  const userPassword = userPasswordInput.value;
  const userName = userNameInput.value;

  if(!userId || !userPassword || !userName) {
    return msgAlert("bottom", "모든 필드를 채워주세요.", "error");
  }

  try {
    const response = await fetch('/api/auth/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
            userId,
            userPassword,
            userName
        }),
    });
    
    if(response.status == 201) {
      msgAlert("center", "회원가입 성공", "success");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000); 
    } else if (response.status == 400) {
      return msgAlert("bottom", "모든 필드를 채워주세요.", "error");
    } else if (response.status == 409) {
      return msgAlert("bottom", "이미 존재하는 아이디입니다.", "error");
    } else {
      return msgAlert("bottom", "가입에 실패했습니다.", "error");
    }
  } catch(error) {
    console.error("Error:", error);
    bottomMsgAlert("서버 통신 오류", "error");
  }
}

joinBtn.addEventListener("click", joinFetch)