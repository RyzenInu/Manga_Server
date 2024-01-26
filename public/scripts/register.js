let serverIP = "localhost";
let url = `http://${serverIP}:2000/user/create`;
let btnRegister = document.getElementById("submitBtn");

btnRegister.addEventListener("click", (e) => {
    console.log("clicked");
    let firstname = document.getElementById("firstname").value;
    let lastname = document.getElementById("lastname").value;
    let email = document.getElementById("email").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let body = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        username: username,
        password: password
    }

    fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(body)
    })
        .then(response => response.json())
        .then(json => {
            if (json.registered === true) {
                window.location.href = "/login"
            } else if (json.registered === false) {
                alert(json.error)
            }
        })
})

let inputPassword = document.getElementById("password");
let inputRepeatPassword = document.getElementById("repeat_password");

inputPassword.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.key == 'Enter') {
        btnRegister.click();
    }
});