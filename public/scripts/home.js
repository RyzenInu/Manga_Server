let serverIP = "localhost";
let url = `http://${serverIP}:2000/`;

window.onload = (event) => {
    loadTeam();
}

async function loadTeam() {
    fetch(url + 'users/').then(repsonse = response.json()).then(json => {
        let users = json;
        users.forEach(user => {
            document.createElement("div");
            //crete and insert users on team panel
        });
    })
}