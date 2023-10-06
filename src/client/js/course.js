const locationMap = document.getElementById("location-map");

let clickCourse = 0;
let courseListInfo;
let isMapDrawn = false;
let map;
let markers = [];
let userLatitude;
let userLongitude;

/**
 * 서버에 요청을해 코스 리스트 정보를 가져옵니다.
 */
const getCourseList = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    window.location.href = "/login?error=need_login";
  }
  try {
    const response = await fetch('/api/course', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });  
    
    if(response.status == 200) {
      const result = await response.json();
      courseListInfo = result.data;
    } else if (response.status === 401) {
      if (result.message === "토큰 만료") return window.location.href = "/login?error=expired";
      else return window.location.href = "/login?error=need_login";
    } 
  } catch(error) {
    console.error("Error:", error);
    return msgAlert("bottom", "서버 통신 오류", "error");
  }
  afterGetCourseList();
}
const afterGetCourseList = () => {
  makeNavHtml(courseListInfo);
  configureLocationWatch();
}

/**
 * 코스 리스트 항목의 on css를 제거합니다.
 */
const deleteCourseListNav = () => {
  const courseWrap = document.querySelectorAll(".course");
  for (let i = 0; i < courseWrap.length; i++) {
    courseWrap[i].classList.remove("on");
  }
}

/**
 * 지도를 움직입니다.
 */
const panTo = (latitude, longitude) => {
  const moveLatLon = new kakao.maps.LatLng(latitude, longitude);
  map.panTo(moveLatLon);
};

/**
 * 코스 리스트 항목을 클릭할 때마다 실행되는 함수
 */
const clickCourseList = (e, courseNo) => {
  if (clickCourse !== courseNo) {
    deleteCourseListNav();
    e.currentTarget.classList.add("on");

    let courseLatitude;
    let courseLongitude;
    if (courseNo === 0) {
      courseLatitude = userLatitude;
      courseLongitude = userLongitude;
    } else {
      let matchedCourse = courseListInfo.find(course => course.course_no === courseNo)
      courseLatitude = matchedCourse.course_latitude;
      courseLongitude = matchedCourse.course_longitude;
    }
    panTo(courseLatitude, courseLongitude);
    clickCourse = courseNo;
  }
}

/**
 * 코스 정보를 바탕으로 항목 HTML을 만듭니다.
 */
const makeNavHtml = (courseList) => {
  const courseWrap = document.getElementById("courseWrap");
  let html = "";
  for (let i = 0; i < courseList.length; i++) {
    html += `<li class="course" onclick="clickCourseList(event, ${courseList[i].course_no})">`
    if (courseList[i].user_courses_id) {
      html += `<div class="mark-wrap"><img src="/file/complete.png" /></div>`
    }
    html += `<p>${courseList[i].course_name}</p>`
    html += `<li>`
  }
  html += `<li id="myPosition" class="course on" onclick="clickCourseList(event, 0)">나의 위치</li>`
  courseWrap.innerHTML = html;
}

/**
 * 지도에 마커를 추가합니다.
 */
const addMarker = (position) => {
  let marker = new kakao.maps.Marker({
    position: position,
  });
  marker.setMap(map);
  markers.push(marker);
}

/**
 * 지도에서 마커를 지웁니다.
 */
const delMarkers = () => {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}

/**
 * 지도를 그립니다.
 */
const drawMap = (latitude, longitude) => {
  const options = {
    center: new kakao.maps.LatLng(latitude, longitude),
    level: 2,
  };
  map = new kakao.maps.Map(locationMap, options);
  map.setZoomable(false);
}

/**
 * 카카오 지도 API에서 사용하는 마커 이미지를 생성합니다.
 */
const createMarkerImage = (url, markerSize) => {
  return new kakao.maps.MarkerImage(url, markerSize);
}

/**
 * 완주하지 않은 코스와 완주한 코스는 서로 다른 이미지로 정적인 마커로 추가합니다.
 */
const addCourseMarker = (course) => {
  let markerImageUrl = "/file/map_not_done.png";
  let markerImageNormalSize = new kakao.maps.Size(24, 35);
  if (course.user_courses_id) {
    markerImageUrl = "/file/map_complete.jpg";
    markerImageNormalSize = new kakao.maps.Size(25, 35);
  }
  const normalImage = createMarkerImage(markerImageUrl, markerImageNormalSize);
  const latlng = new kakao.maps.LatLng(course.course_latitude, course.course_longitude);
  new kakao.maps.Marker({
    map: map,
    position: latlng,
    title: course.course_name,
    image: normalImage,
  });
}

/**
 * 코스 리스트 정보를 가지고 반복하며 마커 추가 함수를 호출합니다.
 */
const setCourseMarker = () => {
  for (let i = 0; i < courseListInfo.length; i++) {
    addCourseMarker(courseListInfo[i]);
  }
}

/**
 * 위치 정보를 이동이 감지될 때마다 가져오고 실행시킵니다.
 */
const configureLocationWatch = () => {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition((pos) => {
      delMarkers();
      userLatitude = pos.coords.latitude;
      userLongitude = pos.coords.longitude;

      if (!isMapDrawn) {
        drawMap(userLatitude, userLongitude);
        setCourseMarker();
        isMapDrawn = true;
      }
      addMarker(new kakao.maps.LatLng(userLatitude, userLongitude));

      if (clickCourse === 0) {
        panTo(userLatitude, userLongitude);
      }
    });
  } else {
    msgAlert("bottom", "위치 정보를 가져올 수 없습니다.", "error");
  }
}

getCourseList();