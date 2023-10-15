async function myContain(accessToken) {
    if (!accessToken) {
        window.location.href = "/login?error=need_login";
        return;
    }

    try {
        const response = await fetch('/api/introduce/contain', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (response.status === 200) {
            const result = await response.json();
            console.log(result.data);

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

async function deltemyCourse(idx) {
    try {
        const response = await fetch('api/introduce/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                idx
            }),
        })
        const result = await response.json();

        if(response.status == 200) {
            msgAlert("center", "삭제 완료", "success");
            setTimeout(() => {
              window.location.href = "/course";
            }, 1000); 
          } else if (response.status === 400) {
            msgAlert("center", "존재하지 않습니다.", "error");
          } else {
            msgAlert("center", "서버 에러", "error");
          }
    } catch(error) {
        console.error("Error:", error);
        msgAlert("center", "서버 통신 오류", "error");
    }
    setTimeout(() => {
        self.location.reload();
    }, 1000);
}


document.addEventListener("DOMContentLoaded", async () => {
    const accessToken = localStorage.getItem("accessToken");

    // myContain 함수를 호출하고 결과를 변수에 저장
    const data = await myContain(accessToken);
    // 여기에서 data를 사용하거나 처리할 수 있습니다.
});

