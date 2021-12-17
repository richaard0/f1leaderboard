const driversSelect = document.querySelector(".drivers");
const tracksSelect = document.querySelector(".tracks");

const addButton = document.querySelector(".add-time-btn");

const minutes = document.querySelector("#minutes");
const seconds = document.querySelector("#seconds");
const fractions = document.querySelector("#fractions");
const tyres = document.querySelector("#tyres");
const deleteEvent = document.querySelector(".delete-event");

const editTitleIcon = document.querySelector(".edit-title");

const leaderboardTableRoot = document.querySelector(".table-root");

const title = document.querySelector(".title");

// Modal stuff
const driverModal = document.querySelector('.driver-modal');
const blackBg = document.querySelector(".blackened");
const blackBg2 = document.querySelector(".blackened2");
const blurBg = document.querySelector(".blur");
const closeDriverModal = document.querySelector('.modal-driver-close');
const closeDeleteTimeModal = document.querySelector('.modal-delete-time-close');
const closeDeleteEventModal = document.querySelector('.modal-delete-event-close');
const lapsModalTableRoot = document.querySelector('.driver-laps-table-root');
const deleteTimeModal = document.querySelector('.delete-time-modal');
const confirmDeleteTime = document.querySelector('#confirm-delete-time-btn');
const cancelDeleteTime = document.querySelector('#cancel-delete-time-btn');
const deleteEventModal = document.querySelector('.delete-event-modal');
const confirmDeleteEvent = document.querySelector('#confirm-delete-event-btn');
const cancelDeleteEvent = document.querySelector('#cancel-delete-event-btn');

const lapNumberHeader = document.querySelector('.lapNumber');
const lapTimeHeader = document.querySelector('.lapTime');
const gapHeader = document.querySelector('.gap');

let currentLapId = getCurrentLapId();
let currentEvent = fetchCurrentEvent();


// After initial load
window.addEventListener("load", () => {
    setInitialLeaderboardTitle();
    updateLeaderboard(leaderboardTableRoot);
    initialize();
    initializeFromLocalStorage();
});



function initialize() {
    addTracksToSelect();
    addDriversToSelect();
    setEventListeners();
    setEventListenersValidation();
    setEventListenersModalTable();
    // if a track is already set, select it then disable the select
    if (currentEvent.track){
        tracksSelect.value = currentEvent.track;
        disableTrackSelectionField()
    }
    addButton.disabled = (minutes.value !== "" && seconds.value !== "" && fractions.value !== "" && tyres.value !== "" && driversSelect.value !== "");
    console.log((minutes.value !== "" && seconds.value !== "" && fractions.value !== "" && tyres.value !== "" && driversSelect.value !== ""));
}

function initializeFromLocalStorage() {
    // set default values
    let fieldsValue = {
        driversSelect: "",
        minutes: "",
        seconds: "",
        fractions: "",
        tyres: ""
    };

    // if there is not current event, set default fieldsValue
    if (!localStorage.getItem("fieldsValue")){
        localStorage.setItem("fieldsValue", JSON.stringify(fieldsValue));
    }

    // fetch current fieldsValue from localStorage
    fieldsValue = JSON.parse(localStorage.getItem("fieldsValue"));

    // add event listeners to the form to store the values in local storage on change
    let form = document.querySelector(".add-time-form");

    addEventListenersToForm(form, "change", fieldsValue);
    addEventListenersToForm(form, "click", fieldsValue);

    // set the fieldsValue to the form
    updateFields(fieldsValue);

}

function addTracksToSelect(){
    tracks.forEach(track => {
        const option = document.createElement("option");
        option.value = track.name;
        option.innerText = track.name;
        tracksSelect.appendChild(option);
    });
}

function addDriversToSelect(){
    drivers.forEach(driver => {
        const option = document.createElement("option");
        option.value = driver.number;
        option.innerText = `${driver.number} - ${driver.name} - ${driver.team}`;
        driversSelect.appendChild(option);
    });
}
