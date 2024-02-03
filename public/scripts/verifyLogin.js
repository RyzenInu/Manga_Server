if (!localStorage.getItem("userId")) {
    window.location.href = "/login";
} else{
    fetch("http://localhost:2000/user/" + localStorage.getItem("userId")).then(response => response.json()).then(json => {
        console.log(json)
        if(json.error){
            window.location.href = "/login";
            localStorage.clear();
        }
    })
}