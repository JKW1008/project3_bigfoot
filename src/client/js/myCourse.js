// 토글슬라이드
const slideUpButton = document.querySelector("#slideUpButton");
const slideTarget = document.querySelector("#slideTarget");
slideUpButton.addEventListener("click", () => {
  slideTarget.classList.toggle("move");
});

async function myContain(accessToken) {
  if (!accessToken) {
    window.location.href = "/login?error=need_login";
    return;
  }

  try {
    const response = await fetch("/api/introduce/contain", {
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



async function deltemyCourse(box) {
  const idx = box.dataset.idx;

  try {
    const response = await fetch("api/introduce/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        idx,
      }),
    });
    const result = await response.json();

    if (response.status == 200) {
      msgAlert("center", "삭제 완료", "success");
      setTimeout(() => {
        window.location.href = "/course";
      }, 1000);
    } else if (response.status === 400) {
      msgAlert("center", "존재하지 않습니다.", "error");
    } else {
      msgAlert("center", "서버 에러", "error");
    }
  } catch (error) {
    console.error("Error:", error);
    msgAlert("center", "서버 통신 오류", "error");
  }
  setTimeout(() => {
    self.location.reload();
  }, 1000);
}

let data = [];
document.addEventListener("DOMContentLoaded", async () => {
  const accessToken = localStorage.getItem("accessToken");

  // myContain 함수를 호출하고 결과를 변수에 저장
  const result = await myContain(accessToken);
  // 여기에서 data를 사용하거나 처리할 수 있습니다.
  data = result;
//   console.log(data);

  const locationMap = document.getElementById("location-map");

  let markers = [];
  let isMapDrawn = false;
  let userLatitude;
  let userLongitude;

  // 맵 그리기
  const drawMap = (latitue, longitude) => {
    const options = {
      center: new kakao.maps.LatLng(latitue, longitude),
      level: 3,
    };

    map = new kakao.maps.Map(locationMap, options);
  };
  const addUserMarker = () => {
    // let maker = new kakao.maps.Marker({
    //   map: map,
    //   position: new kakao.maps.LatLng(userLatitude, userLongitude),
    // });
    // // maker.setMap(map);
    // markers.push(maker);
    let markerImage = "/file/user_marker.png";
    let markerSize = new kakao.maps.Size(24);
    const image = new kakao.maps.MarkerImage(markerImage, markerSize);
    let marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(userLatitude, userLongitude),
      image: image,
    });
    //배열 만들어주기 -> 그려진 마커를 지우기 위해서
    markers.push(marker);
  };
  // 현재 위치 감시 함수-> 위치정보를 가져오는 허락이 있으면 위치정보가 갱신된다
  const configurationLocationWatch = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        //지도상 위에 있는 마커 지우기
        // deleteMarkers();
        // console.log(position);
        //내 위치 확인후 카카오맵에 중앙으로
        userLatitude = position.coords.latitude;
        userLongitude = position.coords.longitude;
        if (!isMapDrawn) {
          //   console.log(position);
          isMapDrawn = true;
          drawMap(userLatitude, userLongitude);
          allCoutseMarker();
        }
        addUserMarker();
      });
    }
  };
  //코스 마커 그리기
  const addCourseMarker = (course) => {
    let markerImage = "/file/map_not_done.png";
    let markerSize = new kakao.maps.Size(24, 35);

    if (course.users_course_id) {
      markerImage = "/file/map_complete.png";
      markerSize = new kakao.maps.Size(40, 50);
    }

    const image = new kakao.maps.MarkerImage(markerImage, markerSize);
    const position = new kakao.maps.LatLng(course.latitude, course.longitude);
    new kakao.maps.Marker({
      map: map,
      position: position,
      title: course.table_name,
      image: image,
    });
  };
  //모든 코스를 돌면서 마커를 그리기 위한 함수
  const allCoutseMarker = () => {
    for (let i = 0; i < data.length; i++) {
      addCourseMarker(data[i]);
    }
  };
  configurationLocationWatch();
  //해당 위치로 지도를 이동한다.
  const panTo = (latitude, longitude) => {
    map.panTo(new kakao.maps.LatLng(latitude, longitude));
  };

  // 코스 리스트 html 표시
  const makeList = () => {
    const courseWrap = document.getElementById("course-wrap");
    // console.log(courseWrap);
    let html = "";
    html += `<li id="myPosition" class="course mylocation on" >나의위치</li>`;
    for (let i = 0; i < data.length; i++) {
      html += `<li class="course">`;
      if (data[i].users_course_id) {
        html += `<div class="mark-wrap"><img src="/file/complete.png"/></div>`;
      }
      html += `<div  data-lat="${data[i].latitude}" data-lon="${data[i].longitude}"><p><span class="targetColore" data-table="${data[i].table_name}" >${
        i + 1
      }</span>${data[i].course_name}</p><span class="delete_btn" data-idx=${data[i].idx} onclick>-</span></div>`
      html += `</li>`;
      // if (data[i].table_name === "arts_and_science") {
      // }
    }
    courseWrap.innerHTML = html;
  };
  makeList();
  // 클릭시  지도 이동
  let courseList = document.querySelectorAll(".course > div");
  // console.log(courseList);
  courseList.forEach((box) => {
    box.addEventListener("click", () => {
      const lat = box.dataset.lat;
      const lon = box.dataset.lon;

      const courseWrap = document.querySelectorAll(".course");
      for (let i = 0; i < courseWrap.length; i++) {
        courseWrap[i].classList.remove("liston");
        courseWrap[i].classList.remove("on");
      }
      box.parentElement.classList.add("liston");
      // console.log(lat,lon);
      panTo(lat, lon);
    });
  });

  let delete_btn = document.querySelectorAll(".delete_btn");
  
  delete_btn.forEach((box) => {
    box.addEventListener("click", () => {
      deltemyCourse(box); // 클릭 시 함수 호출
    });
  });
  //   내위치로 이동하기 함수
  let mylocation = document.querySelector(".mylocation");
  mylocation.addEventListener("click", () => {
    const courseWrap = document.querySelectorAll(".course");
    for (let i = 0; i < courseWrap.length; i++) {
      courseWrap[i].classList.remove("on");
      courseWrap[i].classList.remove("liston");
    }
    mylocation.classList.add("on");
    // console.log("1");
    navigator.geolocation.watchPosition((position) => {
      // console.log(position);
      userLatitude = position.coords.latitude;
      userLongitude = position.coords.longitude;
    });
    // console.log(userLatitude,userLongitude);
    panTo(userLatitude, userLongitude);
  });

//   카테고리별 번호 색상 변경
const setColor = () =>{
    let targetColore = document.querySelectorAll(".targetColore");
    // console.log(targetColore[0].dataset.table);
    targetColore.forEach((box)=>{
        let Kategorie;
        Kategorie = box.dataset.table
        // console.log( box.dataset.table);
        if(Kategorie === "arts_and_science"){
            for (let i = 0; i < targetColore.length; i++) {
                targetColore[i].classList.remove("artYellow");
            }
            box.classList.add("artYellow");
        }else if(Kategorie === "history_and_culture"){
            for (let i = 0; i < targetColore.length; i++) {
                targetColore[i].classList.remove("historyPink");
            }
            box.classList.add("historyPink");
        }else if(Kategorie === "nature_and_relaxation"){
            for (let i = 0; i < targetColore.length; i++) {
                targetColore[i].classList.remove("natureGreen");
            }
            box.classList.add("natureGreen");
        }else {
            
            for (let i = 0; i < targetColore.length; i++) {
                targetColore[i].classList.remove("tourismPink");
            }
            box.classList.add("tourismPink");
        }
    })
}
setColor();
});

