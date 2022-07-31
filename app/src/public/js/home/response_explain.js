const type = document.querySelector("#type");
const address = document.querySelector("#address");
const btn = document.querySelector("#btn");
const text = document.querySelector(".change");
const data_ment = document.querySelector(".data_ment_box");
const data_ment_end = document.querySelector(".data_ment_box_end");
const data_ment_explain = document.querySelector(".data_ment_explain_span");

btn.addEventListener("click", sub);

function sub(event) {
    event.preventDefault();
    console.log("hi response.js");

    const req = {
        type: type.value,
        address: address.value
    };
    fetch("/response_explain", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(req),
        })
        .then((res) => res.json())
        .then((res) => {

            console.log(res);
            console.log("end!");
        });
}