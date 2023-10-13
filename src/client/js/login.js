const joinButton = document.querySelector(".join");
const loginButton = document.querySelector(".login");
const userIdInput = document.getElementById("userId");
const userPasswordInput = document.getElementById("userPassword");


const checkError = () => {
  const notFoundAccessTokenError = getParameterByName("error")

  if (notFoundAccessTokenError == "not_found_access_token") {
    msgAlert("center", "인증에 실패하였습니다.", "error");
  } else if (notFoundAccessTokenError == "sns_login_failed") {
    msgAlert("center", "SNS 로그인에 실패하였습니다.", "error");
  } else if (notFoundAccessTokenError == "need_login") {
    msgAlert("center", "로그인이 필요합니다.", "error");
  } else if (notFoundAccessTokenError == "server_error") {
    msgAlert("center", "서버 에러", "error");
  } else if (notFoundAccessTokenError == "expired") {
    msgAlert("center", "인증이 만료되었습니다.", "error");
  }
  const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
  window.history.replaceState({}, document.title, cleanUrl);
}

const loginFetch = async () => {
  const userId = userIdInput.value;
  const userPassword = userPasswordInput.value;

  if(!userId || !userPassword) {
    return msgAlert("center", "아이디, 비밀번호를 확인해주세요.", "error");
  }

  try {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
            userId,
            userPassword,
        }),
    });  
    if(response.status == 200) {
      const result = await response.json();
      localStorage.setItem("accessToken", result.data.accessToken);
      msgAlert("center", "로그인 성공", "success");
      setTimeout(() => {
        window.location.href = "/";
      }, 1000); 
    } else if (response.status == 400 || response.status == 401) {
      return msgAlert("center", "아이디, 비밀번호를 확인해주세요.", "error");
    } else {
      return msgAlert("center", "로그인에 실패했습니다.", "error");
    }
  } catch(error) {
    console.error("Error:", error);
    centerMsgAlert("서버 통신 오류", "error");
  }
}

checkError();

joinButton.addEventListener("click", () => window.location.href = "/join");
loginButton.addEventListener("click", loginFetch);