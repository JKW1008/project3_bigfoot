document.addEventListener("DOMContentLoaded", function () {
  const headers = document.querySelectorAll(".header"); // 헤더 요소 가져오기
  const footers = document.querySelectorAll(".footer"); // 푸터 요소 가져오기
  const splash = document.getElementById("splash");

  // 세션 스토리지에서 "splashShown" 키를 확인하여 스플래시 화면을 보여줄지 결정합니다.
  const splashShown = sessionStorage.getItem("splashShown");

  if (!splashShown) {
    // 헤더와 푸터를 숨깁니다.
    headers.forEach((header) => {
      header.style.display = "none";
    });
    footers.forEach((footer) => {
      footer.style.display = "none";
    });

    splash.style.display = "block";
    // 스플래시 화면을 보여준 후 "splashShown" 키를 세션 스토리지에 저장합니다.
  // 스크롤을 비활성화합니다.
  document.body.style.overflow = "hidden";


    setTimeout(function () {
      showHeadersAndFooters(); // 헤더와 푸터를 보이는 함수 호출
      hideSplashScreen();
      sessionStorage.setItem("splashShown", "true");
    }, 2000); // 3초 (3000 밀리초) 후에 숨김
  } else {
    // 이미 스플래시 화면을 본 경우에는 헤더와 푸터를 보여줍니다.
    showHeadersAndFooters();
    // 이미 스플래시 화면을 본 경우에는 바로 숨깁니다.
    hideSplashScreen();
  }

  function hideSplashScreen() {
    splash.style.display = "none";
    
    // 스크롤을 활성화
    document.body.style.overflow = "auto";
  }
  // 여기에 추가적인 초기화 코드를 실행할 수 있습니다.
  function showHeadersAndFooters() {
    // 헤더와 푸터를 보이게 합니다.
    headers.forEach((header) => {
      header.style.display = "block";
    });
    footers.forEach((footer) => {
      footer.style.display = "block";
    });
  }
});
