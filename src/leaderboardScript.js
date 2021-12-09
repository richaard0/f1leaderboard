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
const closeModal = document.querySelector('.modal-close');
const modalTableRoot = document.querySelector('.driver-laps-table-root');

let totalLapCounter = getTotalLapCount();

setTitle();

window.addEventListener("load", () => {
    updateLeaderboard();
});

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
    let allLapTimes = fetchAllLapTimes();
    const timeInfo = {
        id: ++totalLapCounter,
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



    let fastestLapTimes = getFastestLapsByDrivers(allLapTimes);

    setAllLapTimes(allLapTimes);
    setFastestLapTimes(fastestLapTimes);

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
    row.lapCell.innerText = getDriverLapCount(lapData.driverNumber);

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
    let allLapTimes = fetchAllLapTimes();
    let driverLaps = [];
    // console.log(allLapTimes);
    allLapTimes.forEach(lapData => {
        if(lapData.driverNumber === driverNumber){
            driverLaps.push(lapData);
        }
    })
    localStorage.setItem('driverLaps', JSON.stringify(driverLaps));
}

function displayDataModalTable(){
    modalTableRoot.innerHTML = "";

    const driverLaps = fetchDriverLaps()

    const driverFastestLap = getFastestLap(driverLaps);
    let lapCount = 0;
    driverLaps.forEach(lap => {
        lapCount++;
        const modalRow = document.createElement('tr');
        const modalRows = {
            lapCountCell : document.createElement('td'),
            lapTimeCell : document.createElement('td'),
            gapCell : document.createElement('td'),
            tyreCell : document.createElement('td'),
            editCell : document.createElement('td'),
            editIcon : document.createElement('i'),
            deleteIcon : document.createElement('i')
        }

        modalRows.lapCountCell.innerText = lapCount;
        modalRows.lapTimeCell.innerText = `${lap.time.minutes}:${lap.time.seconds}:${lap.time.fractions}`;
        modalRows.gapCell.innerText = calculateGapToFastestLap(driverFastestLap, lap.time) === 0 ? "---" : `+${(calculateGapToFastestLap(driverFastestLap, lap.time) / 1000) * -1}`;
        modalRows.tyreCell.innerText = lap.tyres;
        modalRows.editIcon.classList.add('fas', 'fa-edit');
        modalRows.deleteIcon.classList.add('fas', 'fa-trash-alt');
        modalRows.deleteIcon.addEventListener('click', () => {
            deleteSingleLap(lap.id);
            displayDataModalTable();
        })
        modalRows.editCell.appendChild(modalRows.editIcon);
        modalRows.editCell.appendChild(modalRows.deleteIcon);

        for (let td in modalRows) {
            modalRow.appendChild(modalRows[td]);
        }

        modalTableRoot.appendChild(modalRow);
    })
}

function deleteSingleLap(lapId){
    let allLapTimes = fetchAllLapTimes();

    allLapTimes.forEach(lapData => {
        if(lapData.id === lapId){
            allLapTimes.splice(allLapTimes.indexOf(lapData), 1);
        }
    })
    // delete from driver laps
    const driverLapsString = localStorage.getItem('driverLaps');
    const driverLaps = JSON.parse(driverLapsString);
    driverLaps.forEach(lap => {
        if(lap.id === lapId){
            driverLaps.splice(driverLaps.indexOf(lap), 1);
        }
    })
    setDriverLaps(driverLaps);
    setAllLapTimes(allLapTimes);
    updateLeaderboard();
}

