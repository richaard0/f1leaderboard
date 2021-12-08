const driversSelect = document.querySelector(".drivers");
const tracksSelect = document.querySelector(".tracks");

const addButton = document.querySelector(".add-time-btn");

const eventString = localStorage.getItem('event');
const eventName = JSON.parse(eventString);

const minutes = document.querySelector("#minutes");
const seconds = document.querySelector("#seconds");
const fractions = document.querySelector("#fractions");
const tyres = document.querySelector("#tyres");

const tableRoot = document.querySelector(".table-root");

const allLapTimes = [];
let fastestLapTimes = [];

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
        driverNumber: driversSelect.value,
        time: {
            minutes: minutes.value,
            seconds: seconds.value,
            fractions: fractions.value
        },
        tyres: tyres.value
    }

    allLapTimes.push(timeInfo);
    tableRoot.innerHTML = "";

    fastestLapTimes = getFastestLapsByDrivers(allLapTimes);
    fastestLapTimes.forEach(fastestLap => {
        addRowToTable(fastestLap);
    })
})

function addRowToTable(timeInfo) {
    const tableRow = document.createElement("tr");
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

    row.driverNumberCell.innerText = timeInfo.driverNumber;
    row.driverHelmetCell.appendChild(getHelmetImage(timeInfo.driverNumber));
    row.driverNameCell.innerText = getDriverName(timeInfo.driverNumber);
    row.driverTeamCell.innerText = getDriverTeam(timeInfo.driverNumber);
    row.teamImageCell.appendChild(getTeamImage(timeInfo.driverNumber));
    row.timeCell.innerText = `${timeInfo.time.minutes}:${timeInfo.time.seconds}:${timeInfo.time.fractions}`;
    row.gapCell.innerText = "---";
    row.tyreCell.innerText = timeInfo.tyres;
    row.lapCell.innerText = "1";

    for (let td in row) {
        tableRow.appendChild(row[td]);
    }
    tableRoot.appendChild(tableRow);
}

function getFastestLapsByDrivers(times) {
    const fastestLapTimes = [];
    const sortedLapTimes = sortTimes(times);
    const drivers = getDrivers(times);

    // Ugly but it works.
    // I get an array of each driver's fastest lap times then push the first index of that array into the fastestLapTimes array.
    for (let driver of drivers) {
        const driverLapTimes = sortedLapTimes.filter(time => time.driverNumber === driver);
        fastestLapTimes.push(driverLapTimes[0]);
    }

    return fastestLapTimes;
}

function getHelmetImage(driverNumber) {
    const driverName = getDriverName(driverNumber);
    const lastName = driverName.split(" ")[1];
    const helmet = document.createElement("img");
    helmet.src = drivers.find(driver => driver.name === driverName).helmet;
    helmet.classList.add("helmet-img");
    helmet.alt = `${driverName} helmet`;
    return helmet;
}

function getDriverName(driverNumber) {
    return drivers.find(driver => driver.number === driverNumber).name;
}

function getDriverTeam(driverNumber) {
    return drivers.find(driver => driver.number === driverNumber).team;
}

function getTeamImage(driverNumber) {
    const teamName = getDriverTeam(driverNumber);
    const teamImage = document.createElement("img");
    teamImage.src = teams.find(team => team.name === teamName).image;
    teamImage.classList.add("team-img");
    teamImage.alt = `${teamName} car`;
    return teamImage;
}

function setTitle() {
    const title = document.querySelector(".title");
    title.innerText = eventName.title;
}

function sortTimes(times) {
    return times.sort((a, b) => {
        return ((a.time.minutes * 60 * 1000) + (a.time.seconds * 1000) + a.time.fractions) - ((b.time.minutes * 60 * 1000) + (b.time.seconds * 1000) + b.time.fractions);
    });
}

function getDrivers(times) {
    const drivers = [];
    times.forEach(time => {
        if(!drivers.includes(time.driverNumber)){
            drivers.push(time.driverNumber);
        }
    });
    return drivers;
}

function getFastestLap(driverNumber, times) {
    return times.find(time => time.driverNumber === driverNumber && time.time.minutes === 0 && time.time.seconds === 0 && time.time.fractions === 0); // What does this line do?
}

// function getGap(driverNumber, time){
//     const driver = drivers.find(driver => driver.number === driverNumber);
//     const driverGap = driver.gap;
//     const driverTime = time.minutes * 60 + time.seconds + time.fractions / 100;
//     return driverGap - driverTime;
// }