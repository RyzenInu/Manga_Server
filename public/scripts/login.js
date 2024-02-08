if (localStorage.getItem("userId")) {
    window.location.href = "/home";
}

function toggleScale() {
    let container = document.getElementsByClassName("loginPanel")[0];
    container.classList.toggle("scale")
}

window.onload = (e) => {
    toggleScale();
}

let serverIP = "89.115.17.17";
let serverPort = "3000"
let url = `http://${serverIP}:${serverPort}/`;
let btnLogin = document.getElementById("submitBtn");

btnLogin.addEventListener("click", (e) => {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let body;

    if (username != "", password != "") {
        body = {
            username: username,
            password: password
        }
    } else {
        alert("Username and password fields cannot be empty.")
        return;
    }


    fetch(url + "user/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    })
        .then(response => response.json())
        .then(json => {
            if (json.logged === true) {
                console.log(json);
                localStorage.setItem("userId", JSON.parse(json.userId))
                toggleScale()
                setTimeout(() => {
                    window.location.href = "/home"
                }, 300);
            } else if (json.logged === false) {
                alert(json.error)
            }
        })
})

let inputPassword = document.getElementById("password");

inputPassword.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.key == 'Enter') {
        btnLogin.click();
    }
});