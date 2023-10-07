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
let userLatitue;
let userLongitude;
let clickCourseId = 0;
//지도그리는 함수
// 현재 위치 감시 함수-> 위치정보를 가져오는 허락이 있으면 위치정보가 갱신된다
const configurationLocationWatch = () => {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition((position) => {
      // deleteMarker();
      // console.log(position);
      //내 위치 확인후 카카오맵에 중앙으로
      userLatitue = position.coords.latitude;
      userLongitude = position.coords.longitude;
      if (!isMapDrawn) {
        // console.log(position);
        isMapDrawn = true;
        drawMap(userLatitue, userLongitude);
        addCourseMarker();
      }
      addUserMarker();
      if (clickCourseId === 0) {        
        panTo(userLatitue, userLongitude);
      }
    });
  }
};
configurationLocationWatch();
const addUserMarker = () => {
  let maker = new kakao.maps.Marker({
    map: map,
    position: new kakao.maps.LatLng(userLatitue, userLongitude),
  });
  // maker.setMap(map);
  markers.push(maker);
};
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
  addCourseMarkers(latitude,longitude);
}