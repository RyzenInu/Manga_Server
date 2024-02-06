let serverIP = "localhost";
let url = `http://${serverIP}:2000/`;
let btnRegister = document.getElementById("submitBtn");

function toggleScale(){
    let container = document.getElementsByClassName("loginPanel")[0];
    container.classList.toggle("scale")
}

window.onload = (e) => {
    toggleScale();
}

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

btnRegister.addEventListener("click", (e) => {
    let firstname = document.getElementById("firstname").value;
    let lastname = document.getElementById("lastname").value;
    let email = document.getElementById("email").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let repeatPassword = document.getElementById("repeat_password").value;
    let body;

    if (firstname != "" && lastname != "" && email != "" && username != "" && password != "" && repeatPassword != "") {
        if (password != repeatPassword) {
            alert("Passwords do not match.")
            return;
        } else if (!validateEmail(email)) {
            alert("Invalid Email")
            return;
        } else {
            body = {
                firstname: firstname,
                lastname: lastname,
                email: email,
                username: username,
                password: password
            }
        }
    } else {
        alert("Please fill all fields to create an account.")
        return;
    }


    fetch(url + "user/create", {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(body)
    })
        .then(response => response.json())
        .then(json => {
            if (json.registered === true) {
                toggleScale()
                setTimeout(() => {
                    window.location.href = "/login"
                }, 300);
            } else if (json.registered === false) {
                alert(json.error)
            }
        })
})

//let inputPassword = document.getElementById("password");
let inputRepeatPassword = document.getElementById("repeat_password");

inputRepeatPassword.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.key == 'Enter') {
        btnRegister.click();
    }
});