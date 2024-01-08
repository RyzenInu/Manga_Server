var userProfile = document.getElementsByClassName("navbar-user")[0];;

window.onload = (event) => {
    
}

userProfile.addEventListener("click", (e) => {
    let currentSize = {"height":userProfile.offsetHeight, "width":userProfile.offsetWidth}
    console.log(currentSize)
    //userProfile.style.maxWidth = currentSize.width;
    userProfile.style.width = "100%";
    //userProfile.style.height = currentSize.width;
    userProfile.style.maxWidth = "1000px";
    userProfile.style.maxHeight = "500px";
    userProfile.style.position = "absolute";
})