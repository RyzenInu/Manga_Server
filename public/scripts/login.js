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
})