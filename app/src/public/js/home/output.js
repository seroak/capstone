const result_btn = document.querySelector(".result_btn");
const reuslt_txt = document.querySelector(".result_txt");
const result_img = document.querySelector(".result_img");
const result_img2 = document.querySelector(".result_img2");
const visible_box = document.querySelector(".visible_box");

result_btn.addEventListener("click", readTextFile);


function readTextFile(event) {
    event.preventDefault();
    console.log("hi output");
    const req = {};
    fetch("/output", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(req),
        })
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            reuslt_txt.innerHTML = res;
            result_img.style.display = "block";
            result_img2.style.display = "block";
            visible_box.style.display = "block";
        });
}