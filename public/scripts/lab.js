loadUsers();

async function loadUsers(){
    fetch(url + 'team/users/' + localStorage.getItem("userId"))
    .then(response => response.json())
    .then(json => {
        if(json.error){
            console.log(json)
            return;
        } else{
            let users = json;
            users.forEach(user => {
                
                let teamList = document.getElementById("labUsers")
                
                let teamUser = document.createElement("div");
                teamUser.classList.add("contentPanel")
                teamUser.classList.add("labUser")
    
                let teamUserImg = document.createElement("div");
                let img = document.createElement("img");
                img.addEventListener("error", (event) => {
                    event.target.onerror=null; 
                    event.target.src='../images/person_FILL0_wght400_GRAD0_opsz24.svg';
                })   
                img.src = url + "/images/users/" + user.img
                teamUserImg.appendChild(img)
                
                let teamUserInfo = document.createElement("div");

                let teamUserName = document.createElement("div");
                let teamUserRealName = document.createElement("div");
                let teamUserUsername = document.createElement("div");
                teamUserRealName.innerText = user.firstname + " " + user.lastname
                teamUserUsername.innerText = user.username;
                teamUserName.appendChild(teamUserRealName);
                teamUserName.appendChild(teamUserUsername);

                let teamUserEmail = document.createElement("div");
                teamUserEmail.innerText = user.email;

                teamUserInfo.appendChild(teamUserName);
                teamUserInfo.appendChild(teamUserEmail);
                teamUser.appendChild(teamUserImg);
                teamUser.appendChild(teamUserInfo);
    
                teamList.appendChild(teamUser);
            });
        }
    })
}