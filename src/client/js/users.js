const usersNav = document.getElementById("usersNav");

const notLoginHtml = () => {
  let html = "";
  html += `<a href="/login"><button>로그인</button></a>`;
  usersNav.innerHTML = html;
}

const loginHtml = (data) => {
  let html = "";
  html += `<div class="user-info">`
  if (data.user_image) {
    html += `<img src="${data.user_image}" alt="유저 이미지">`
  } else {
    html += `<img src="/file/people.jpg" alt="유저 이미지">`
  }
  html += `
            <span>${data.name}</span>
          </div>`
  html += `<button class="logout-btn" onclick="logout()">로그아웃</button>`
  usersNav.innerHTML = html;
}

const logout = () => {
  localStorage.removeItem("accessToken");
  location.reload();
}

const checkUserInfo = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    notLoginHtml();
    return;
  }
  try {
    const response = await fetch('/api/auth/token/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      }
    }); 
    const result = await response.json();
    if(response.status === 200 ) {
      loginHtml(result.data);
    } else {
      localStorage.removeItem("accessToken");
      notLoginHtml();
      if (response.status == 401 && result.message === "토큰 만료") {
        msgAlert("bottom", "인증 만료", "error");
      } else {
        msgAlert("bottom", "인증 실패", "error");
      }
    }
  } catch(error) {
    console.error("Error:", error);
    notLoginHtml();
    msgAlert("bottom", "서버 에러", "error");
  }
}


checkUserInfo();