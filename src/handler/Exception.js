export default class Exception {
  static QR_EMPTY = { statusCode: 400, statusText: "error", message: "QR코드가 없습니다.",  data: "" };
  static QR_BAD_REQUEST = { statusCode: 400, statusText: "error", message: "잘못된 QR정보 입니다.",  data: "" };
  static LOCATION_EMPTY = { statusCode: 400, statusText: "error", message: "위치 정보 없음",  data: "" };
  static OUT_OF_RANGE = { statusCode: 400, statusText: "error", message: "위치 적용 범위 초과",  data: "" };
  static AUTH_ERROR = { statusCode: 401, statusText: "error", message: "토큰 인증 에러", data : "" };
  static AUTH_EXPIRED = { statusCode: 401, statusText: "error", message: "토큰 만료", data : "" };
  static NOT_EQUAL_PASSWORD = { statusCode: 401, statusText: "error", message: "아이디, 비밀번호를 확인해주세요.", data : "" };
  static NOT_USER_FOUND = { statusCode: 401, statusText: "error", message: "아이디, 비밀번호를 확인해주세요.", data : "" };
  static ALREADY_VISTED = { statusCode: 409, statusText: "error", message: "이미 방문한 코스",  data: "" };
  static ID_EXIST = { statusCode: 409, statusText: "error", message: "이미 존재하는 아이디입니다.", data : "" };
  static INTERNAL_SERVER_ERROR = { statusCode: 500, statusText: "error", message: "서버 에러", data : "" };
}
