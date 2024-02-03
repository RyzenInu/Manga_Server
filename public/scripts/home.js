/*
let serverIP = "localhost";
let url = `http://${serverIP}:2000/`;
*/

//window.onload = (event) => {}

loadTeam();
async function loadTeam() {
    fetch(url + 'team/users/' + localStorage.getItem("userId"))
    .then(response => response.json())
    .then(json => {
        console.log(json);
        if(json.error){
            console.log(json)
            return;
        } else{
            let users = json;
            users.forEach(user => {
                
                let teamList = document.getElementById("teamList")
                
                let teamUser = document.createElement("div");
                teamUser.classList.add("teamUser")
    
                let teamUserImg = document.createElement("div");
                teamUserImg.classList.add("teamUserImg")
    
                let img = document.createElement("img");
                img.addEventListener("error", (event) => {
                    event.target.onerror=null; 
                    event.target.src='../images/person_FILL0_wght400_GRAD0_opsz24.svg';
                })
                    
                img.src = url + "/images/users/" + user.img
    
                let teamUserName = document.createElement("div");
                teamUserName.classList.add("teamUserName")
                teamUserName.innerText = user.firstname + " " + user.lastname
    
                teamUserImg.appendChild(img)
                teamUser.appendChild(teamUserImg);
                teamUser.appendChild(teamUserName);
    
                teamList.appendChild(teamUser);
            });
        }
    })
}

let btnOpenEquipment = document.getElementById("btnOpenEquipment")
let btnOpenStats = document.getElementById("btnOpenStats")

btnOpenEquipment.addEventListener("click", (e) => {
    window.location.href = "/equipment"
})

btnOpenStats.addEventListener("click", (e) => {
    window.location.href = "/stats"
})