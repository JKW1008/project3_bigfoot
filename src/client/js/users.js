async function myPage(accessToken) {
  if (!accessToken) {
    window.location.href = "/login?error=need_login";
    return;
  }

  try {
    const response = await fetch("/api/auth/mypage", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 200) {
      const result = await response.json();
      // console.log(result.data);

      // 여기에서 데이터를 반환하도록 변경
      return result.data;
    } else if (response.status === 401) {
      window.location.href = "/login?error=expired";
      return null; // 또는 에러 상황에 따라 적절한 값을 반환
    } else {
      msgAlert("center", "서버 오류", "error");
      return null; // 또는 에러 상황에 따라 적절한 값을 반환
    }
  } catch (error) {
    console.error("Error:", error);
    msgAlert("center", "서버 통신 오류", "error");
    return null; // 또는 에러 상황에 따라 적절한 값을 반환
  }

}


async function myStamp(accessToken) {
  try {
    const response = await fetch("/api/introduce/contain", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 200){
      const result = await response.json();
      return result.data;
    }
  }catch (error) {
    console.error("Error:", error);
    msgAlert("center", "서버 통신 오류", "error");
    return null; // 또는 에러 상황에 따라 적절한 값을 반환
  }
} 

document.addEventListener("DOMContentLoaded", async () => {
  const accessToken = localStorage.getItem("accessToken");

  // myContain 함수를 호출하고 결과를 변수에 저장
  const result = await myPage(accessToken);
  const stamp = await myStamp(accessToken);
console.log(result);
  const user_profile = document.querySelector(".user_profile");
  let profilehtml = `<p>내 아이디 : ${result.user_email}</p>`;



  let arts_and_science = [];
  let history_and_culture = [];
  let nature_and_relaxation = [];
  let tourism_and_shopping = [];
  
  let stampnum = 0;

  for (let i = 0; i < stamp.length; i++) {
    if (stamp[i].table_name === "arts_and_science") {
      arts_and_science.push(stamp[i]);
    } else if (stamp[i].table_name === "history_and_culture") {
      history_and_culture.push(stamp[i]);
    } else if (stamp[i].table_name === "nature_and_relaxation") {
      nature_and_relaxation.push(stamp[i]);
    } else if (stamp[i].table_name === "tourism_and_shopping") {
      tourism_and_shopping.push(stamp[i]);
    }

    if (stamp[i].visited == 1){
      stampnum += 1;
    }
  }

  profilehtml +=`<p>나의 스탬프 갯수 : ${stampnum} 개</p>`
  user_profile.innerHTML = profilehtml;

  const artVisited = arts_and_science.some(item => item.visited === 1);
  const artmission = document.querySelector("#artmission");
  let artHtml = ``;
  if (artVisited) {
    artHtml = `<img src="/file/stamp/missionStamp-1.png"/>`;
  } else {
    artHtml = `예술과<br/>과학`;
  }
  artmission.innerHTML = artHtml;

  const hisVisited = history_and_culture.some(item => item.visited === 1);
  const hismission = document.querySelector("#hismission");
  let hisHtml = ``;
  if (hisVisited) {
    hisHtml = `<img src="/file/stamp/missionStamp-2.png"/>`;
  } else {
    hisHtml = `예술과<br/>과학`;
  }
  hismission.innerHTML = hisHtml;

  const restVisited = nature_and_relaxation.some(item => item.visited === 1);
  const restmission = document.querySelector("#restmission");
  let restHtml = ``;
  if (restVisited) {
    restHtml = `<img src="/file/stamp/missionStamp-3.png"/>`;
  } else {
    restHtml = `자연와<br/>휴식`;
  }
  restmission.innerHTML = restHtml;

  const shopVisited = tourism_and_shopping.some(item => item.visited === 1);
  const shopmission = document.querySelector("#shopmission");
  let shopHtml = ``;
  if (shopVisited) {
    shopHtml = `<img src="/file/stamp/missionStamp-4.png"/>`;
  } else {
    shopHtml = `관광과<br/>쇼핑`;
  }
  shopmission.innerHTML = shopHtml;

  // console.log(arts_and_science);
  
const tab_1_content = document.querySelector("#tab_1_content");
let yellowTabthtml = ``;

for (let i = 0; i < arts_and_science.length; i++) {
  if (arts_and_science[i].visited === 1) {
    yellowTabthtml += `<div><img src="/file/stamp/autoStamp-1.png"/></div>`;
  } else {
    yellowTabthtml += `<div><p>${arts_and_science[i].course_name}</p></div>`;
  }
}
tab_1_content.innerHTML = yellowTabthtml;

const tab_2_content = document.querySelector("#tab_2_content");
let brownTabthtml = ``;

for (let i = 0; i < history_and_culture.length; i++) {
  if (history_and_culture[i].visited === 1) {
    brownTabthtml += `<div><img src="/file/stamp/autoStamp-2.png"/></div>`;
  } else {
    brownTabthtml += `<div><p>${history_and_culture[i].course_name}</p></div>`;
  }
}
tab_2_content.innerHTML = brownTabthtml;

const tab_3_content = document.querySelector("#tab_3_content");
let greenTabthtml = ``;

for (let i = 0; i < nature_and_relaxation.length; i++) {
  if (nature_and_relaxation[i].visited === 1) {
    greenTabthtml += `<div><img src="/file/stamp/autoStamp-3.png"/></div>`;
  } else {
    greenTabthtml += `<div><p>${nature_and_relaxation[i].course_name}</p></div>`;
  }
}
tab_3_content.innerHTML = greenTabthtml;

const tab_4_content = document.querySelector("#tab_4_content");
let pinkTabthtml = ``;

for (let i = 0; i < tourism_and_shopping.length; i++) {
  if (tourism_and_shopping[i].visited === 1) {
    pinkTabthtml += `<div><img src="/file/stamp/autoStamp-4.png"/></div>`;
  } else {
    pinkTabthtml += `<div><p>${tourism_and_shopping[i].course_name}</p></div>`;
  }
}
tab_4_content.innerHTML = pinkTabthtml;





  const mycourse = document.querySelector(".mycourse");
  mycourse.addEventListener("click", () => {
    window.location.href = "/course"
  })
})
