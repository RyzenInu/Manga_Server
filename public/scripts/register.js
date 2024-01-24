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
})