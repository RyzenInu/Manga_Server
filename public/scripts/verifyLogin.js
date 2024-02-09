if (!localStorage.getItem("userId")) {
    window.location.href = "/login";
} else{
    fetch("http://89.115.17.17:3000/" + "user/" + localStorage.getItem("userId")).then(response => response.json()).then(json => {
        if(json.error){
            window.location.href = "/login";
            localStorage.clear();
        }
    })
}