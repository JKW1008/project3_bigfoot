
const calculateDistance = (currentLat, currentLon, targetLat, targetLon) => {
  currentLat = parseFloat(currentLat); currentLon = parseFloat(currentLon); targetLat = parseFloat(targetLat); targetLon = parseFloat(targetLon);
  const dLat = (targetLat - currentLat) * 111000; // 위도 차이를 미터로 변환
  const dLon = (targetLon - currentLon) * 111000 * Math.cos(currentLat * (Math.PI / 180)); // 경도 차이를 미터로 변환

  // 피타고라스의 정리를 이용하여 두 지점 사이의 거리를 계산
  return Math.sqrt(dLat * dLat + dLon * dLon);
}
const distCheck = (dist) => {
  if (dist <= 50) {
    console.log('두 지점의 거리는 50m 이내입니다.');
  } else if (dist <= 100) {
    console.log('두 지점의 거리는 50m 이상 100m 이내입니다.');
  } else {
    console.log('두 지점의 거리는 50m를 초과합니다.');
  }
}


const 시지_광장_위도 = 35.839270509515444;
const 시지_광장_경도 = 128.70664350303022;

const 영진_위도 = 35.87556844734378;
const 영진_경도 = 128.68148794146364

const 용계역_4번_출구_위도 = 35.87631775168957;
const 용계역_4번_출구_경도 = 128.68180821675898;

const dist1 = calculateDistance(시지_광장_위도, 시지_광장_경도, 영진_위도, 영진_경도);
console.log(dist1);
distCheck(dist1)

const dist2 = calculateDistance(용계역_4번_출구_위도, 용계역_4번_출구_경도, 영진_위도, 영진_경도);
console.log(dist2);
distCheck(dist2)

