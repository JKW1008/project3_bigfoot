document.addEventListener("DOMContentLoaded", () => {
    const chk = document.querySelector(".chk");
    const accessToken = localStorage.getItem("accessToken"); // 오타 수정

    if (!accessToken) {
        chk.classList.add("myStamp");
    } else {
        chk.classList.remove("myStamp"); // 클래스 제거
        chk.classList.remove("login-button"); // 클래스 제거
        chk.classList.add("copymyStamp");
        chk.addEventListener("click", () => {
            window.location.href = "/users";
        })
    }
});
