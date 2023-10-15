import Exception from "../handler/Exception.js";
import CourseRepository from "../repository/CourseRepository.js";

export const getCourseListWitUser = async (user) => {
  return await CourseRepository.findCourseListWithUser(user);
}

export const chkVisited = async (user, qr) => {
  try {
    const visited =  await CourseRepository.checkVisited(user, qr);

    if (visited === false){
      return await CourseRepository.updateVisited(user, qr);
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error in updateVisited:", error);
    throw error;
  }
}
// export const updateCourseVisitedStatus = async ({ user, qrCode, latitude, longitude }) => {
//   const course = await CourseRepository.findCourseByQrCode(qrCode);
//   if (!course) throw Exception.QR_BAD_REQUEST;

//   const isVisited = await CourseRepository.findUsersCourse(user.user_no, course.course_no);
//   if (isVisited) throw Exception.ALREADY_VISTED;

//   const dist = calculateDistance(latitude, longitude, course.course_latitude, course.course_longitude);
//   if (dist > 100000) throw Exception.OUT_OF_RANGE;
  
//   await CourseRepository.updateCourseVisited(user.user_no, course.course_no);
// }

/**
 * 질문1: 왜 111,000을 곱하는가?
 * - 지구의 둘레는 대략 40,000km입니다. 적도에서 1도의 경도 차이는 지구의 둘레의 1/360으로, 약 111km에 해당합니다.
 * - 이를 미터로 변환하면 111,000m입니다. 따라서 이 값을 곱해 위도와 경도의 차이를 실제 거리로 변환합니다.
 * 
 * 질문2: 왜 경도에 코사인을 적용하는가?
 * - 지구는 구 모양이므로, 위도가 변함에 따라 경도 1도의 거리도 변합니다. 적도 근처에서는 거리가 길지만, 극점으로 갈수록 그 거리는 줄어듭니다.
 * - 위도에 따른 이 거리의 변화를 반영하기 위해 코사인 값을 적용합니다.
 */
// const calculateDistance = (currentLat, currentLon, targetLat, targetLon) => {
//   currentLat = parseFloat(currentLat); currentLon = parseFloat(currentLon); targetLat = parseFloat(targetLat); targetLon = parseFloat(targetLon);
//   const dLat = (targetLat - currentLat) * 111000; // 위도 차이를 미터로 변환
//   const dLon = (targetLon - currentLon) * 111000 * Math.cos(currentLat * (Math.PI / 180)); // 경도 차이를 미터로 변환

//   // 피타고라스의 정리를 이용하여 두 지점 사이의 거리를 계산
//   return Math.sqrt(dLat * dLat + dLon * dLon);
// }

