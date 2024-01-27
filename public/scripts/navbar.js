const currentUrl = (window.location.pathname).slice(1);
let serverIP = "localhost";
let url = `http://${serverIP}:2000/`;

window.onload = (event) => {
    loadProfile();
    setActiveBtn();
}

async function loadProfile() { // This function will GET and load all user data.

    // Get user info by id (id should be on localStorage)
    const response = await fetch(url + "user/" + localStorage.getItem("userId"));
    const user = await response.json();

    // Separates user into multiple variables for easier access
    let username = user.username;
    let firstname = user.firstname;
    let lastname = user.lastname;
    let email = user.email;
    let lab = user.lab;
    let img = user.img;

    // Change the profile button text to the users first and last name respectively
    let profileBtnName = document.getElementById("profileBtnName");
    profileBtnName.innerText = `${firstname} ${lastname}`

    // Popup info load
    let userPopupName = document.getElementById("userPopupName");
    userPopupName.innerText = `${firstname} ${lastname}`;

    let userPopupUsername = document.getElementById("userPopupUsername");
    userPopupUsername.innerText = username;

    let userPopupEmail = document.getElementById("userPopupEmail");
    userPopupEmail.innerText = email;

    let userPopupLab = document.getElementById("userPopupLab");
    userPopupLab.innerText = lab;

    let profileBtnImg = document.getElementById("profileBtnImg");
    let userPopupImg = document.getElementById("userPopupImg");
    if (img != "") {
        profileBtnImg.src = "../images/" + img;
        userPopupImg.src = "../images/" + img;
    }
}

function setActiveBtn() {
    let btns = document.getElementsByClassName("navbar-button");
    switch (currentUrl) {
        case "home":
            btns.item(0).classList.toggle("active");
            break;
        case "equipment":
            btns.item(1).classList.toggle("active");
            break;
        case "stats":
            btns.item(2).classList.toggle("active");
            break;

    }
}

var userProfile = document.getElementById("navbar-user");

userProfile.addEventListener("click", (e) => {
    toggleUserPopup()
    toggleBlurBg();
    /*userProfile.style.position = "absolute";
    userProfile.style.top = pos.top + "px";
    userProfile.style.left = pos.left + "px";
 
    userProfile.style.transform = "translate(-50%, -50%)";
    userProfile.style.top = "50%";
    userProfile.style.left = "50%";*/
})


var userPopupCloseBtn = document.getElementById("userPopupCloseBtn");

userPopupCloseBtn.addEventListener("click", (e) => {
    toggleUserPopup();
    toggleBlurBg();
})

var userPopup = document.getElementById("userPopup")

userPopup.style.top = userProfile.offsetTop + "px";
userPopup.style.left = userProfile.offsetLeft + "px";

function toggleUserPopup() {
    userProfile.classList.toggle("o0")
    userPopup.classList.toggle("popupActive")
}

var blurBg = document.getElementById("blurBg")

function toggleBlurBg() {
    blurBg.classList.toggle("active")
}

let btnLogout = document.getElementById("btnLogout")
btnLogout.addEventListener("click", (e) => { 
    localStorage.clear();
    window.location.href = "/login";
})