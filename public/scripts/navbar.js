const currentUrl = (window.location.pathname).slice(1);

window.onload = (event) => {
    setActiveBtn();
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