loadDevices();

let btnAddDevice = document.getElementById("btnAddDevice")
btnAddDevice.addEventListener("click", (e) => {
    toggleAddDevicePopup()
})

let btnConfirmAddDevice = document.getElementById("btnConfirmAddDevice")
btnConfirmAddDevice.addEventListener("click", (e) => {
    let inputName = document.getElementById("deviceName");
    let inputMac = document.getElementById("deviceMac");
    let inputTotalVolume = document.getElementById("deviceTotalVolume");
    if (inputName.value != "" && inputMac.value != "" && inputTotalVolume.value != "") {
        addDevice(inputName.value, inputMac.value, inputTotalVolume.value)
    } else {
        alert("Both fields must be filled!")
    }
})

let btnCancelAddDevice = document.getElementById("btnCancelAddDevice")
btnCancelAddDevice.addEventListener("click", (e) => {
    toggleAddDevicePopup()
})

function toggleAddDevicePopup() {
    toggleBlurBg()
    equipmentPopup.classList.toggle("active")
}

function loadDevices() {
    let equipmentList = document.getElementById("equipmentList");
    fetch(url + "equipment/user/" + localStorage.getItem("userId")).then(response => response.json()).then(json => {
        try {
            equipmentList.replaceChildren();
            json.forEach(device => {
                equipmentList.appendChild(createDevicePanel(device));
            });
            loadDeviceValues()
        } catch (e) {
            alert(e);
        }
    })
}

function createDevicePanel(deviceInfo) {
    // Base Element
    let equipmentPanel = document.createElement("div")
    equipmentPanel.classList.add("contentPanel")
    equipmentPanel.classList.add("equipmentPanel")
    equipmentPanel.id = deviceInfo.id;

    // Icon
    let equipmentPanelIcon = document.createElement("div")
    equipmentPanelIcon.classList.add("equipmentPanelIcon")

    let deviceIcon = document.createElement("span")
    deviceIcon.classList.add("material-symbols-rounded")
    deviceIcon.innerText = "glass_cup"
    equipmentPanelIcon.appendChild(deviceIcon);
    equipmentPanel.appendChild(equipmentPanelIcon);

    // Content
    let equipmentPanelContent = document.createElement("div")
    equipmentPanelContent.classList.add("equipmentPanelContent")

    // Name
    let equipmentPanelName = document.createElement("div")
    equipmentPanelName.classList.add("equipmentPanelName")
    equipmentPanelName.innerText = deviceInfo.name
    equipmentPanelContent.appendChild(equipmentPanelName)

    // Temperature
    let equipmentPanelTemperature = document.createElement("div")
    equipmentPanelTemperature.classList.add("equipmentPanelTemperature")

    let tempIcon = document.createElement("span")
    tempIcon.classList.add("material-symbols-rounded")
    tempIcon.innerText = "thermometer"
    equipmentPanelTemperature.appendChild(tempIcon)

    let equipmentPanelTemperatureValue = document.createElement("div")
    equipmentPanelTemperatureValue.classList.add("equipmentPanelTemperatureValue")
    equipmentPanelTemperatureValue.innerText = "00ºC"
    equipmentPanelTemperature.appendChild(equipmentPanelTemperatureValue)
    equipmentPanelContent.appendChild(equipmentPanelTemperature)

    // Motor State
    let equipmentPanelMotorState = document.createElement("div")
    equipmentPanelMotorState.classList.add("equipmentPanelMotorState")

    let motorIcon = document.createElement("span")
    motorIcon.classList.add("material-symbols-rounded")
    motorIcon.innerText = "sync"
    equipmentPanelMotorState.appendChild(motorIcon)

    let equipmentPanelMotorStateValue = document.createElement("div")
    equipmentPanelMotorStateValue.classList.add("equipmentPanelMotorStateValue")
    if (deviceInfo.motor == true) {
        equipmentPanelMotorStateValue.innerText = "Motor ON"
    } else if (deviceInfo.motor == false) {
        equipmentPanelMotorStateValue.innerText = "Motor OFF"
    }
    equipmentPanelMotorState.appendChild(equipmentPanelMotorStateValue)
    equipmentPanelContent.appendChild(equipmentPanelMotorState)

    // Volume
    let equipmentPanelVolume = document.createElement("div")
    equipmentPanelVolume.classList.add("equipmentPanelVolume")

    let volumeBar = document.createElement("div")
    volumeBar.classList.add("volumeBar")

    let volumeIcon = document.createElement("span");
    volumeIcon.classList.add("material-symbols-rounded")
    volumeIcon.innerText = "water_medium"
    equipmentPanelVolume.appendChild(volumeIcon)

    let volumeBarProgress = document.createElement("div")
    volumeBarProgress.classList.add("volumeBarProgress")
    volumeBar.appendChild(volumeBarProgress)
    equipmentPanelVolume.appendChild(volumeBar)


    let equipmentPanelVolumeValue = document.createElement("div")
    equipmentPanelVolumeValue.classList.add("equipmentPanelVolumeValue")
    equipmentPanelVolumeValue.innerText = "0.0L"
    equipmentPanelVolume.appendChild(equipmentPanelVolumeValue)
    equipmentPanelContent.appendChild(equipmentPanelVolume)

    equipmentPanel.appendChild(equipmentPanelContent)

    let buttons = document.createElement("div");
    buttons.classList.add("equipmentActionButtons");

    let buttonMotor = document.createElement("div");
    let buttonTemp = document.createElement("div");

    let buttonMotorIcon = document.createElement("span");
    let buttonTempIcon = document.createElement("span");

    buttonMotorIcon.classList.add("material-symbols-rounded");
    buttonTempIcon.classList.add("material-symbols-rounded");

    buttonMotorIcon.innerText = "360"
    buttonTempIcon.innerText = "mode_heat"

    buttonMotor.appendChild(buttonMotorIcon);
    buttonTemp.appendChild(buttonTempIcon);

    let motorState = deviceInfo.motor;
    if (motorState == 1) {
        buttonMotor.classList.add("active");
    } else if (motorState == 0) {
        buttonMotor.classList.remove("active");
    }
    buttonMotor.addEventListener("click", (e) => {
        if (e.target.classList.contains("active")) {
            e.target.classList.remove("active");
            sendToggleMotor(deviceInfo.mac, "OFF");
            //currentState = false;
        } else if (!e.target.classList.contains("active")) {
            e.target.classList.add("active");
            sendToggleMotor(deviceInfo.mac, "clockwise");
            //currentState = true;
        }
    })

    let tempState = deviceInfo.peltier;
    if (tempState == 1) {
        buttonTemp.classList.add("active");
    } else if (tempState == 0) {
        buttonTemp.classList.remove("active");
    }
    buttonTemp.addEventListener("click", (e) => {
        let currentState = tempState;
        console.log(currentState);
        if (e.target.classList.contains("active")) {
            e.target.classList.remove("active");
            sendToggleTemp(deviceInfo.mac, "OFF");
            //currentState = false;
        } else if (!e.target.classList.contains("active")) {
            e.target.classList.add("active");
            sendToggleTemp(deviceInfo.mac, "ON");
            //currentState = true;
        }

    })

    buttons.appendChild(buttonMotor);
    buttons.appendChild(buttonTemp);
    equipmentPanel.appendChild(buttons);
    return equipmentPanel;
}

async function sendToggleMotor(mac, order) {
    let body = {
        mac: mac,
        order: order
    }
    fetch(url + "equipment/send/motor/", {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(body)
    })
}

async function sendToggleTemp(mac, order) {
    let body = {
        mac: mac,
        order: order
    }
    fetch(url + "equipment/send/temp/", {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(body)
    })
}

function addDevice(name, mac, totalVolume) {
    let body = {
        name: name,
        mac: mac,
        totalVolume: totalVolume
    };

    fetch(url + "equipment/user/add/" + localStorage.getItem("userId"), {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(body)
    })
        .then(response => response.json())
        .then(json => {
            if (json.created == false) {
                alert(json.error)
            } else if (json.created == true) {
                alert("Successfully added device to your laboratory.")
                loadDevices();
                toggleAddDevicePopup();
            }
        })
}

async function loadDeviceValues() { // Load Device Values
    let devicePanels = document.getElementsByClassName("equipmentPanel");
    for (let i = 0; i < devicePanels.length; i++) {
        let panel = devicePanels[i]
        let deviceId = panel.id;
        await fetch(url + "equipment/" + deviceId + "/sensors")
            .then(response => response.json())
            .then(json => {
                if (!json.error) {
                    let tempValue = panel.getElementsByClassName("equipmentPanelContent")[0].getElementsByClassName("equipmentPanelTemperature")[0].getElementsByClassName("equipmentPanelTemperatureValue")[0];
                    tempValue.innerText = json.temp.valor + "ºC";

                    let motorValue = panel.getElementsByClassName("equipmentPanelContent")[0].getElementsByClassName("equipmentPanelMotorState")[0].getElementsByClassName("equipmentPanelMotorStateValue")[0];
                    console.log(json);
                    if(json.motor == 0){
                        motorValue.innerText = "Motor OFF";
                    } else if(json.motor == 1){
                        motorValue.innerText = "Motor ON";
                    }

                    let volValue = panel.getElementsByClassName("equipmentPanelContent")[0].getElementsByClassName("equipmentPanelVolume")[0].getElementsByClassName("equipmentPanelVolumeValue")[0];
                    volValue.innerText = json.volume.valor + "L";

                    let volBarProgress = panel.getElementsByClassName("equipmentPanelContent")[0].getElementsByClassName("equipmentPanelVolume")[0].getElementsByClassName("volumeBar")[0].getElementsByClassName("volumeBarProgress")[0];
                    volBarProgress.style.width = ((json.volume.valor * 100.0) / json.totalVolume) + "%";
                }
            })
    }
}
setInterval(loadDeviceValues, 3000)