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

loadEquipment();
async function loadEquipment(){
    fetch(url + 'equipment/user/' + localStorage.getItem("userId"))
    .then(response => response.json())
    .then(json => {
        console.log(json);
        if(json.error){
            console.log(json)
            return;
        } else{
            let devices = json;
            devices.forEach(device => {
                
                let equipmentList = document.getElementById("equipmentList")
                
                let equipmentDevice = document.createElement("div");
                equipmentDevice.classList.add("equipmentDevice")
    
                let deviceName = document.createElement("div");
                deviceName.innerText = device.name;
                
                let deviceTotalVolume = document.createElement("div");
                deviceTotalVolume.innerText = "Total Volume: " +  device.total_volume + "L";
                    
                equipmentDevice.appendChild(deviceName);
                equipmentDevice.appendChild(deviceTotalVolume);
    
                equipmentList.appendChild(equipmentDevice);
            });
        }
    })
}

let btnOpenEquipment = document.getElementById("btnOpenEquipment")
btnOpenEquipment.addEventListener("click", (e) => {
    window.location.href = "/equipment"
})

// let btnOpenStats = document.getElementById("btnOpenStats")
// btnOpenStats.addEventListener("click", (e) => {
//     window.location.href = "/stats"
// })