const email = document.getElementById("id");
const password = document.getElementById("password");
const confirmPsword = document.querySelector("#password_confirm");
const sign_up = document.getElementById("sign_up");


function change_color() {
    if (email.value != '' && password.value != '' && confirmPsword.value != '') {
        sign_up.style.backgroundColor = "rgba(13, 13, 14, 0.733)";
        sign_up.disabled = false;
    }
    if (email.value === '' || password.value === '' || confirmPsword.value === '') {
        sign_up.style.backgroundColor = "hsl(108, 8%, 77%)";
        sign_up.disabled = true;
    }
}

const id = document.querySelector("#id"),
    name = document.querySelector("#name"),
    psword = document.querySelector("#password"),
    registerBtn = document.querySelector("#sign_up"),
    type = document.querySelector("#type"),
    address = document.querySelector("#address");


registerBtn.addEventListener("click", register);


function register(event) {
    event.preventDefault();
    if (!id.value) return alert("아이디를 입력해주십시오");
    if (psword.value !== confirmPsword.value) return alert("비밀번호가 일치하지 않습니다");
    const req = {
        id: id.value,
        name: name.value,
        psword: psword.value,
        confirmPsword: confirmPsword.value,
        address: address.value,
        type: type.value,
    };

    fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(req),
        })
        .then((res) => res.json())
        .then((res) => {
            if (res.success) {
                location.href = "/login";
            } else {
                alert(res.msg);
            }
        })
        .catch((err) => {
            console.error("회원가입 중 에러 발생");
        });
}