let serverIP = "localhost";
let url = `http://${serverIP}:2000/user/login`;
let btnLogin = document.getElementById("submitBtn");

btnLogin.addEventListener("click", (e) => {
    console.log("clicked");
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let body = {
        username: username,
        password: password
    }

    fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(body)
    })
        .then(response => response.json())
        .then(json => {
            if (json.logged === true) {
                localStorage.setItem("userId", json.userId)
                window.location.href = "/home"
            } else if (json.registered === false) {
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