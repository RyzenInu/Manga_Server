var scrollPrevBtn = document.getElementById("prevSectionIndicator");
var scrollNextBtn = document.getElementById("nextSectionIndicator");
var scrollable = document.getElementById('scrollable');
var labManagerBtn = document.getElementById('btnLabManager');

scrollPrevBtn.addEventListener("click", (event) => {
    scrollable.scrollTo(0, (scrollable.scrollTop - document.body.clientHeight));
});

scrollNextBtn.addEventListener("click", (event) => {
    scrollable.scrollTo(0, (scrollable.scrollTop + document.body.clientHeight));
});

scrollable.addEventListener("scroll", () => {
    if (scrollable.scrollTop < document.body.clientHeight) {
        scrollPrevBtn.style.opacity = "0";
        scrollPrevBtn.style.visibility = "collapse";
    } else if (scrollable.scrollTop >= document.body.clientHeight){
        scrollPrevBtn.style.opacity = 1;
        scrollPrevBtn.style.visibility = "visible";
    }
    var scrollBottom = () => {
        
    }
    console.log(scrollable.scrollTop);
})

labManagerBtn.addEventListener("click", (event) => {
    location.href = "/login"
})