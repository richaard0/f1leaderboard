const driversSelect = document.querySelector(".drivers");
const tracksSelect = document.querySelector(".tracks");

const addButton = document.querySelector(".add-time-btn");

const eventString = localStorage.getItem('event');
const eventName = JSON.parse(eventString);

const minutes = document.querySelector("#minutes");
const seconds = document.querySelector("#seconds");
const fractions = document.querySelector("#fractions");
const tyres = document.querySelector("#tyres");

const leaderboardTableRoot = document.querySelector(".table-root");

// Modal stuff
const modal = document.querySelector('.popup-modal');
const blackBg = document.querySelector(".blackened");
const modalButton = document.querySelector('.modal-button');
const closeModal = document.querySelector('.modal-close');
const modalTableRoot = document.querySelector('.driver-laps-table-root');

// Global variables to help manage state
const allLapTimes = [];
let fastestLapTimes = [];
let driverLaps = [];

setTitle();

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

// Add button click behaviour
addButton.addEventListener("click", (e) => {
    e.preventDefault();

    const timeInfo = {
        track: tracksSelect.value,
        driverNumber: Number(driversSelect.value),
        time: {
            minutes: Number(minutes.value),
            seconds: Number(seconds.value),
            fractions: Number(fractions.value)
        },
        tyres: tyres.value
    }

    allLapTimes.push(timeInfo);
    leaderboardTableRoot.innerHTML = "";

    fastestLapTimes = getFastestLapsByDrivers(allLapTimes);
    const fastestLapTime = getFastestLap(allLapTimes)
    fastestLapTimes.forEach(lapData => {
        addRowToTable(lapData, fastestLapTime);
    })
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
        modal.classList.toggle('modal-visible');
        blackBg.classList.toggle('blackened-visible');
        displayDataModalTable();
    } )
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
    row.lapCell.innerText = getLapCount(lapData.driverNumber);

    for (let td in row) {
        tableRow.appendChild(row[td]);
    }
    leaderboardTableRoot.appendChild(tableRow);
}

// Check to move to modals js

blackBg.addEventListener('click', () => {
    modal.classList.toggle('modal-visible');
    blackBg.classList.toggle('blackened-visible');
});

closeModal.addEventListener('click', () => {
    modal.classList.toggle('modal-visible');
    blackBg.classList.toggle('blackened-visible');
});


// Check if functions below need to be moved to helpers
//
//

function getTimesFromDriver(driverNumber){
    driverLaps = [];
    console.log(allLapTimes);
    allLapTimes.forEach(lapData => {
        if(lapData.driverNumber === driverNumber){
            driverLaps.push(lapData);
        }
    })
    localStorage.setItem('driverLaps', JSON.stringify(driverLaps));
}

function displayDataModalTable(){
    const driverLapsString = localStorage.getItem('driverLaps');
    const driverLaps = JSON.parse(driverLapsString);
    const driverFastestLap = getFastestLap(driverLaps);
    modalTableRoot.innerHTML = "";
    let lapCount = 0;
    driverLaps.forEach(lap => {
        lapCount++;
        const modalRow = document.createElement('tr');
        const lapCountCell = document.createElement('td');
        const lapTimeCell = document.createElement('td');
        const gapCell = document.createElement('td');
        const tyreCell = document.createElement('td');
        const editCell = document.createElement('td');
        const editIcon = document.createElement('i');
        const deleteIcon = document.createElement('i');
        lapCountCell.innerText = lapCount;
        lapTimeCell.innerText = `${lap.time.minutes}:${lap.time.seconds}:${lap.time.fractions}`;
        gapCell.innerText = calculateGapToFastestLap(driverFastestLap, lap.time) === 0 ? "---" : `+${(calculateGapToFastestLap(driverFastestLap, lap.time) / 1000) * -1}`;
        tyreCell.innerText = lap.tyres;
        editIcon.classList.add('fas', 'fa-edit');
        deleteIcon.classList.add('fas', 'fa-trash-alt');
        editCell.appendChild(editIcon);
        editCell.appendChild(deleteIcon);
        modalRow.appendChild(lapCountCell);
        modalRow.appendChild(lapTimeCell);
        modalRow.appendChild(gapCell);
        modalRow.appendChild(tyreCell);
        modalRow.appendChild(editCell);
        modalTableRoot.appendChild(modalRow);
    })
}
