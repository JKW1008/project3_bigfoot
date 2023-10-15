const boardDetail = document.querySelectorAll(".boardDetail");

boardDetail.forEach((box) => {
    const idx = box.dataset.idx;

    box.addEventListener("click", () => {
        self.location.href = "/boardListDatail?idx=" + idx;
    })
})