const driversSelect = document.querySelector(".drivers");
const tracksSelect = document.querySelector(".tracks");

const addButton = document.querySelector(".add-time-btn");

const eventString = localStorage.getItem('event');

const minutes = document.querySelector("#minutes");
const seconds = document.querySelector("#seconds");
const fractions = document.querySelector("#fractions");
const tyres = document.querySelector("#tyres");
const deleteEvent = document.querySelector(".delete-event");

const leaderboardTableRoot = document.querySelector(".table-root");

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

let currentLapId = getCurrentLapId();
let currentEvent = fetchCurrentEvent();



// After initial load
window.addEventListener("load", () => {
    setLeaderboardTitle();
    updateLeaderboard();
    initialize();
    initializeFromLocalStorage();
});


deleteEvent.addEventListener("click", () => {
    showDeleteEventModal();
});

confirmDeleteEvent.addEventListener("click", () => {
    handleDeleteEvent(currentEvent.id);
});

cancelDeleteEvent.addEventListener("click", () => {
    hideDeleteEventModal();
});

closeDeleteEventModal.addEventListener("click", () => {
    hideDeleteEventModal();
});

blackBg2.addEventListener("click", () => {
    hideDeleteEventModal();
});

// Add button click behaviour
addButton.addEventListener("click", (e) => {
    e.preventDefault();
    let allLapTimes = fetchAllLapTimes();
    const timeInfo = {
        id: ++currentLapId,
        track: tracksSelect.value,
        driverNumber: Number(driversSelect.value),
        time: {
            minutes: Number(minutes.value),
            seconds: Number(seconds.value),
            fractions: Number(fractions.value)
        },
        tyres: tyres.value,
        eventId: currentEvent.id
    }

    allLapTimes.push(timeInfo);
    let allLapTimesEvent = getAllLapTimesEvent(allLapTimes, currentEvent.id);
    let fastestLapTimes = getFastestLapsByDrivers(allLapTimesEvent);

    setAllLapTimes(allLapTimes);
    setFastestLapTimes(fastestLapTimes);
    setAllLapTimesCurrentEvent(allLapTimesEvent);

    updateLeaderboard();
})



function addRowToTable(lapData, fastestLap) {
    const lapTime = {
        minutes: lapData.time.minutes,
        seconds: lapData.time.seconds,
        fractions: lapData.time.fractions
    }

    const tableRow = document.createElement("tr");
    tableRow.addEventListener("click", () => {
        getTimesFromDriver(lapData.driverNumber);
        driverModal.classList.toggle('modal-visible');
        blackBg.classList.toggle('blackened-visible');
        displayDataModalTable();
    })
    const row = {
        driverNumberCell: document.createElement("td"),
        driverHelmetCell: document.createElement("td"),
        driverNameCell: document.createElement("td"),
        driverTeamCell: document.createElement("td"),
        teamImageCell: document.createElement("td"),
        timeCell: document.createElement("td"),
        gapCell: document.createElement("td"),
        tyreCell: document.createElement("td"),
        lapCell: document.createElement("td")
    }
    row.driverNumberCell.innerText = lapData.driverNumber;
    row.driverHelmetCell.appendChild(getHelmetImage(lapData.driverNumber));
    row.driverNameCell.innerText = getDriverName(lapData.driverNumber);
    row.driverTeamCell.innerText = getDriverTeam(lapData.driverNumber);
    row.teamImageCell.appendChild(getTeamImage(lapData.driverNumber));
    row.timeCell.innerText = `${lapData.time.minutes}:${lapData.time.seconds}:${lapData.time.fractions}`;
    row.gapCell.innerText = calculateGapToFastestLap(fastestLap, lapTime) === 0 ? "---" : `+${(calculateGapToFastestLap(fastestLap, lapTime) / 1000) * -1}`;
    row.tyreCell.innerText = lapData.tyres;
    row.lapCell.innerText = getDriverLapCount(lapData.driverNumber);

    for (let td in row) {
        tableRow.appendChild(row[td]);
    }
    leaderboardTableRoot.appendChild(tableRow);
}

// Check to move to modals js
blackBg.addEventListener('click', () => {
    hideDriverModal();
});

closeDriverModal.addEventListener('click', () => {
    hideDriverModal();
});

blurBg.addEventListener('click', () => {
    hideDeleteTimeModal();
});

closeDeleteTimeModal.addEventListener('click', () => {
    hideDeleteTimeModal();
});


function getTimesFromDriver(driverNumber) {
    let allLapTimes = fetchAllLapTimes();
    let driverLaps = [];
    // console.log(allLapTimes);
    allLapTimes.forEach(lapData => {
        if (lapData.driverNumber === driverNumber) {
            driverLaps.push(lapData);
        }
    })
    localStorage.setItem('driverLaps', JSON.stringify(driverLaps));
}

function displayDataModalTable() {
    lapsModalTableRoot.innerHTML = "";

    const driverLaps = fetchDriverLaps()
    const modalTitle = document.querySelector(".modal-title");
    modalTitle.innerText = `${driverLaps[0].driverNumber} - ${getDriverName(driverLaps[0].driverNumber)} - ${getDriverTeam(driverLaps[0].driverNumber)}`;
    const driverFastestLap = getFastestLap(driverLaps);
    let lapCount = 0;
    driverLaps.forEach(lap => {
        lapCount++;
        const modalRow = document.createElement('tr');
        const modalRows = {
            lapCountCell: document.createElement('td'),
            lapTimeCell: document.createElement('td'),
            gapCell: document.createElement('td'),
            tyreCell: document.createElement('td'),
            editCell: document.createElement('td'),
        }
        let editIcon = document.createElement('i');
        let deleteIcon = document.createElement('i');

        modalRows.lapCountCell.innerText = lapCount;
        modalRows.lapTimeCell.innerText = `${lap.time.minutes}:${lap.time.seconds}:${lap.time.fractions}`;
        modalRows.lapTimeCell.contentEditable = "false"
        modalRows.gapCell.innerText = calculateGapToFastestLap(driverFastestLap, lap.time) === 0 ? "---" : `+${(calculateGapToFastestLap(driverFastestLap, lap.time) / 1000) * -1}`;
        modalRows.tyreCell.innerText = lap.tyres;
        modalRows.tyreCell.contentEditable = "false";
        modalRows.editCell.classList.add('edit-cell');
        editIcon.classList.add('fas', 'fa-edit');
        editIcon.addEventListener('click', function () { // not using arrow function to access "this"
            modalRows.lapTimeCell.isContentEditable ? modalRows.lapTimeCell.contentEditable = "false" : modalRows.lapTimeCell.contentEditable = "true";
            modalRows.lapTimeCell.classList.toggle('editable');
            modalRows.tyreCell.isContentEditable ? modalRows.tyreCell.contentEditable = "false" : modalRows.tyreCell.contentEditable = "true";
            modalRows.tyreCell.classList.toggle('editable');
            this.classList.toggle('fa-edit');
            this.classList.toggle('fa-check');
            // update the lap time in the driverLaps array
            // TODO: add validation later
            let updatedLap = {
                id: lap.id,
                time: {
                    minutes: Number(modalRows.lapTimeCell.innerText.split(':')[0]),
                    seconds: Number(modalRows.lapTimeCell.innerText.split(':')[1]),
                    fractions: Number(modalRows.lapTimeCell.innerText.split(':')[2])
                },
                tyres: modalRows.tyreCell.innerText,
                driverNumber: lap.driverNumber
            }
            if (!modalRows.lapTimeCell.isContentEditable) {
                updateLapTime(updatedLap);
                displayDataModalTable();
            }
            // updateLapTime(updatedLap);
        })
        // TODO: Refactor this mess lmao
        deleteIcon.classList.add('fas', 'fa-trash-alt');
        deleteIcon.addEventListener('click', () => {
            deleteTimeModal.classList.toggle('modal-visible');
            blurBg.classList.toggle('blur-visible');
            confirmDeleteTime.addEventListener('click', () => {
                deleteSingleLap(lap.id);
                hideDriverModal();
                hideDeleteTimeModal();
            })
            cancelDeleteTime.addEventListener('click', () => {
                hideDeleteTimeModal();
            })
        })

        modalRows.editCell.appendChild(editIcon);
        modalRows.editCell.appendChild(deleteIcon);
        for (let td in modalRows) {
            modalRow.appendChild(modalRows[td]);
        }

        lapsModalTableRoot.appendChild(modalRow);
    })
}

function hideDriverModal() {
    driverModal.classList.remove('modal-visible');
    blackBg.classList.remove('blackened-visible');
}

function showDriverModal() {
    driverModal.classList.add('modal-visible');
    blackBg.classList.add('blackened-visible');
}

function hideDeleteTimeModal() {
    deleteTimeModal.classList.remove('modal-visible');
    blurBg.classList.remove('blur-visible');
}

function showDeleteTimeModal() {
    deleteTimeModal.classList.add('modal-visible');
    blackBg.classList.add('blur-visible');
}

function hideDeleteEventModal(){
    deleteEventModal.classList.remove('modal-visible');
    blackBg2.classList.remove('blackened-visible');
}

function showDeleteEventModal(){
    deleteEventModal.classList.add('modal-visible');
    blackBg2.classList.add('blackened-visible');
}


function updateLapTime(updatedLap) {
    // find and replace the lap time in local storage
    // replace in allLapTimes and driverLaps
    console.log("in update lap time")
    const allLapTimes = fetchAllLapTimes();
    const driverLaps = fetchDriverLaps();
    findAndReplace(updatedLap, allLapTimes);
    findAndReplace(updatedLap, driverLaps);
    setDriverLaps(driverLaps);
    setAllLapTimes(allLapTimes);
    updateLeaderboard();
}

function findAndReplace(updatedLap, laps) {
    laps.forEach(lap => {
        if (lap.id === updatedLap.id) {
            lap.time.minutes = updatedLap.time.minutes;
            lap.time.seconds = updatedLap.time.seconds;
            lap.time.fractions = updatedLap.time.fractions;
            lap.tyres = updatedLap.tyres;
        }
    })
}

function deleteSingleLap(lapId) {
    let allLapTimes = fetchAllLapTimes();

    allLapTimes.forEach(lapData => {
        if (lapData.id === lapId) {
            allLapTimes.splice(allLapTimes.indexOf(lapData), 1);
        }
    })
    // delete from driver laps
    const driverLapsString = localStorage.getItem('driverLaps');
    const driverLaps = JSON.parse(driverLapsString);
    driverLaps.forEach(lap => {
        if (lap.id === lapId) {
            driverLaps.splice(driverLaps.indexOf(lap), 1);
        }
    })
    setDriverLaps(driverLaps);
    setAllLapTimes(allLapTimes);
    updateLeaderboard();
}

function handleDeleteEvent(eventId){
    // delete event with eventId
    const allEvents = fetchAllEvents();
    allEvents.forEach(event => {
        if (event.id === eventId) {
            allEvents.splice(allEvents.indexOf(event), 1);
        }
    })
    // delete from all laps
    let allLapTimes = fetchAllLapTimes();
    allLapTimes = allLapTimes.filter(lap => {
        return lap.eventId !== eventId
    })

    // delete from driver laps
    // const driverLaps = fetchDriverLaps();
    // for (let lap of driverLaps){
    //     console.log(lap);
    //     if (lap.eventId === eventId){
    //         driverLaps.splice(driverLaps.indexOf(lap), 1);
    //     }
    // }
    // setDriverLaps(driverLaps);
    setAllLapTimes(allLapTimes);
    updateLeaderboard();
    setAllEvents(allEvents);
    hideDeleteEventModal();
    window.location.href = "index.html";
}

function initialize() {
    // Add tracks to the select menu
    tracks.forEach(track => {
        const option = document.createElement("option");
        option.value = track.name;
        option.innerText = track.name;
        tracksSelect.appendChild(option);
    });

    // Add drivers to the select menu
    drivers.forEach(driver => {
        const option = document.createElement("option");
        option.value = driver.number;
        option.innerText = `${driver.number} - ${driver.name} - ${driver.team}`;
        driversSelect.appendChild(option);
    });
}

function initializeFromLocalStorage() {
    let fieldsValue = {
        driversSelect: "",
        tracksSelect: "",
        minutes: "",
        seconds: "",
        fractions: "",
        tyres: ""
    };
    if (!localStorage.getItem("fieldsValue")){
        localStorage.setItem("fieldsValue", JSON.stringify(fieldsValue));
    }
    fieldsValue = JSON.parse(localStorage.getItem("fieldsValue"));
    let form = document.querySelector(".add-time-form");
    // add event listeners to the form to store the values in local storage on change
    form.addEventListener("change", function(event) {
        let fieldsValue = {
            driversSelect: driversSelect.value,
            tracksSelect: tracksSelect.value,
            minutes: minutes.value,
            seconds: seconds.value,
            fractions: fractions.value,
            tyres: tyres.value
        };
        localStorage.setItem("fieldsValue", JSON.stringify(fieldsValue));
    });

    // loop through form elements and set their values to the values in localStorage
    for (let i = 0; i < form.elements.length - 1; i++) {
        let element = form.elements[i];
        element.value = JSON.parse(localStorage.getItem("fieldsValue"))[element.name];
    }
}