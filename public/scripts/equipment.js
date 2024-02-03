let btnAddDevice = document.getElementById("btnAddDevice")
btnAddDevice.addEventListener("click", (e) => {
    toggleAddDevicePopup()
})

let btnConfirmAddDevice = document.getElementById("btnConfirmAddDevice")
btnConfirmAddDevice.addEventListener("click", (e) => {
    
})

let btnCancelAddDevice = document.getElementById("btnCancelAddDevice")
btnCancelAddDevice.addEventListener("click", (e) => {
    toggleAddDevicePopup()
})

function toggleAddDevicePopup() {
    toggleBlurBg()
    equipmentPopup.classList.toggle("active")
}