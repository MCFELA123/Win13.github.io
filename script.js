const chargeLevel = document.getElementById("charge-level");
const charge = document.getElementById("charge");
const chargingTimeRef = document.getElementById("charging-time");

window.onload = () => {
  //For browsers that don't support the battery status API
  if (!navigator.getBattery) {
    alert("Please update your device for better performance");
    return false;
  }

};
/*

window.onload = function() {ariaChat()};

function ariaChat() {
  if(document.getElementById("mode").innerHTML = 'light') {
    document.getElementById("charge").style.background = 'red';
  }

  else {
    document.getElementById("charge").style.background = 'white';
  }
}
*/
navigator.getBattery().then((battery) => {
  function updateAllBatteryInfo() {
    updateChargingInfo();
    updateLevelInfo();
  }
  updateAllBatteryInfo();

  //When the charging status changes
  battery.addEventListener("chargingchange", () => {
    updateAllBatteryInfo();
  });

  //When the Battery Levvel Changes
  battery.addEventListener("levelchange", () => {
    updateAllBatteryInfo();
  });

  function updateChargingInfo() {
    if (battery.charging) {
      charge.classList.add("active");
      charge.style.background = 'rgb(0, 255, 145)';
      document.getElementById("battery").style.color = 'white';
      chargingTimeRef.innerText = "";
    } else {
      charge.classList.remove("active");
      charge.style.background = 'rgb(53, 53, 53)';
      document.getElementById("battery").style.color = '    color: rgba(255, 255, 255, 0.718);';
      //Display time left to discharge only when it is a integer value i.e not infinity
      if (parseInt(battery.dischargingTime)) {
        let hr = parseInt(battery.dischargingTime / 3600);
        let min = parseInt(battery.dischargingTime / 60 - hr * 60);
        chargingTimeRef.innerText = `${hr}hr ${min}mins remaining`;
      }
    }
  }

  //Updating battery level
  function updateLevelInfo() {
    let batteryLevel = `${parseInt(battery.level * 100)}%`;
    charge.style.width = batteryLevel;
    chargeLevel.textContent = batteryLevel;
  }
});
