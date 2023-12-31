// 캐러셀
let swiper = new Swiper(".mySwiper", {
  loop:true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
    
  }
});

// 토글슬라이드
const slideUpButton = document.querySelector('#slideUpButton');
const slideTarget = document.querySelector('#slideTarget');
slideUpButton.addEventListener("click",()=>{
  slideTarget.classList.toggle("move");
})

// 지도맵
const locationMap = document.getElementById("location-map");
let markers = [];
let isMapDrawn = false;
let userLatitude;
let userLongitude;
let clickCourseId = 0;
//지도그리는 함수
// 현재 위치 감시 함수-> 위치정보를 가져오는 허락이 있으면 위치정보가 갱신된다
const configurationLocationWatch = () => {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition((position) => {
      //지도상 위에 있는 마커 지우기
      deleteMarkers();      
      // console.log(position);
      //내 위치 확인후 카카오맵에 중앙으로
      userLatitude = position.coords.latitude;
      userLongitude = position.coords.longitude;
      if (!isMapDrawn) {
        // console.log(position);
        isMapDrawn = true;
        drawMap(userLatitude, userLongitude);
        addCourseMarkers();
      }
      addUserMarker();
      // if (clickCourseId === 0) {        
      //   panTo(userLatitude, userLongitude);
      // }
    });
  }
};
//마커를 초기화 하는 함수(유저 마커가 새로생일때 기존꺼를 지워버리기 위한 용도)
const deleteMarkers = () => {
  for (let i = 0 ; i < markers.length; i++){
      markers[i].setMap(null);
  }
  markers = [];
}
configurationLocationWatch();
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
        map : map,
        position : new kakao.maps.LatLng(userLatitude, userLongitude),
        image: image,
    });
    //배열 만들어주기 -> 그려진 마커를 지우기 위해서 
    markers.push(marker);
};
// 맵 그리기
const drawMap = (latitue, longitude) => {
  const options = {
    center: new kakao.maps.LatLng(latitue, longitude),
    level: 3,
  };
  
  map = new kakao.maps.Map(locationMap, options);  
};
//코스 마커 그리기
const addCourseMarkers = (latitude,longitude) => {  
  let markerImage = "/file/map_not_done.png";
  let markerSize = new kakao.maps.Size(24, 35);
  // if (course.users_course_id) {
  //   markerImage = "/file/map_complete.jpg";
  //   markerSize = new kakao.maps.Size(40, 50);
  // }

  const image1 = new kakao.maps.MarkerImage(markerImage, markerSize);
  const position1 = new kakao.maps.LatLng(latitude, longitude);
  new kakao.maps.Marker({
    map: map,
    position: position1,
    title: "영진",
    image: image1,
  });
};

function tripLocation(latitude,longitude){
  // console.log(longitude);
  // console.log(latitude);
  drawMap(latitude,longitude);
  addUserMarker();
  addCourseMarkers(latitude,longitude);
}

const btn_detail = document.querySelectorAll(".btn_detail");
btn_detail.forEach((box) => {
  box.addEventListener("click", () => {
    const tableName = box.dataset.tableName; // 소문자로 접근
    const idx = box.dataset.idx; // 소문자로 접근
    // URL을 올바르게 생성하기 위해 문자열 연결 연산자를 사용해야 합니다.
    self.location.href = "/detail?table_name=" + tableName + "&idx=" + idx;
  });
});


async function containCourse(tableName, idx, name, lat, lon, qr, accessToken) {
  try {
    const response = await fetch('/api/introduce', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        tableName,
        idx,
        name,
        lat,
        lon,
        qr,
        accessToken
      }),
    });
    const result = await response.json();

    if (response.status === 200) {
      msgAlert("center", "저장 완료", "success");
    } else if (response.status === 400) {
      msgAlert("center", result.message, "error");
    } else if (response.status === 401) {
      if (result.message === "토큰 만료") return window.location.href = "/login?error=expired";
      else return window.location.href = "/login?error=need_login";
    } else if (response.status === 409) {
      msgAlert("center", "이미 방문한 코스입니다.", "error");
    } else {
      msgAlert("center", "서버 에러", "error");
    }
  } catch (error) {
    console.error("Error:", error);
    msgAlert("center", "서버 통신 오류", "error");
  }
}

const btn_cotain = document.querySelectorAll(".btn_cotain");
btn_cotain.forEach((box) => {
  box.addEventListener("click", () => {
    const tableName = box.dataset.tableName;
    const idx = box.dataset.courseIdx;
    const name = box.dataset.courseName;
    const lat = box.dataset.lat;
    const lon = box.dataset.lon;
    const qr = box.dataset.qr;
    const accessToken = localStorage.getItem("accessToken");

    if(!accessToken){
      window.location.href = "/login?error=need_login";
    }
    containCourse(tableName, idx, name, lat, lon, qr, accessToken);
  });
});
