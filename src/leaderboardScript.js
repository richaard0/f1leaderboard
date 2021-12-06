const driversSelect = document.querySelector(".drivers");
const tracksSelect = document.querySelector(".tracks");

const addButton = document.querySelector(".add-time-btn");

const eventString = localStorage.getItem('event');
const event = JSON.parse(eventString);

const minutes = document.querySelector("#minutes");
const seconds = document.querySelector("#seconds");
const fractions = document.querySelector("#fractions");
const tyres = document.querySelector("#tyres");

const tableRoot = document.querySelector(".table-root");

const allTimes = [];

const title = document.querySelector(".title");
title.innerText = event.title;

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
        }        ,
        tyres: tyres.value
    }

    allTimes.push(timeInfo);
    console.log(allTimes);
    tableRoot.innerHTML = "";  
    allTimes.forEach(timeInfo => {
        addToTable(timeInfo);
    })
})

function addToTable(timeInfo){
    const tableRow = document.createElement("tr");
    const driverNumberCell = document.createElement("td");
    const driverHelmetCell = document.createElement("td");
    const driverNameCell = document.createElement("td");
    const driverTeamCell = document.createElement("td");
    const teamImageCell = document.createElement("td");
    const timeCell = document.createElement("td");
    const gapCell = document.createElement("td");
    const tyreCell = document.createElement("td");

    driverNumberCell.innerText = timeInfo.driverNumber;
    driverHelmetCell.appendChild(getHelmetImage(timeInfo.driverNumber));
    driverNameCell.innerText = getDriverName(timeInfo.driverNumber);
    driverTeamCell.innerText = getDriverTeam(timeInfo.driverNumber);
    teamImageCell.appendChild(getTeamImage(timeInfo.driverNumber));
    timeCell.innerText = `${timeInfo.time.minutes}:${timeInfo.time.seconds}:${timeInfo.time.fractions}`;
    gapCell.innerText = "---";
    tyreCell.innerText = timeInfo.tyres;

    tableRow.appendChild(driverNumberCell);
    tableRow.appendChild(driverHelmetCell);
    tableRow.appendChild(driverNameCell);
    tableRow.appendChild(driverTeamCell);
    tableRow.appendChild(teamImageCell);
    tableRow.appendChild(timeCell);
    tableRow.appendChild(gapCell);
    tableRow.appendChild(tyreCell);

    tableRoot.appendChild(tableRow);
    
}

function getHelmetImage(driverNumber){
    const driverName = getDriverName(driverNumber);
    const lastName = driverName.split(" ")[1];
    const helmet = document.createElement("img");
    helmet.src = drivers.find(driver => driver.name === driverName).helmet;
    helmet.classList.add("helmet-img");
    helmet.alt = `${driverName} helmet`;
    return helmet;
}

function getDriverName(driverNumber){
    return drivers.find(driver => driver.number === driverNumber).name;
}

function getDriverTeam(driverNumber){
    return drivers.find(driver => driver.number === driverNumber).team;
}

function getTeamImage(driverNumber){
    const teamName = getDriverTeam(driverNumber);
    const teamImage = document.createElement("img");
    teamImage.src = teams.find(team => team.name === teamName).image;
    teamImage.classList.add("team-img");
    teamImage.alt = `${teamName} car`;
    return teamImage;
}

// function getGap(driverNumber, time){
//     const driver = drivers.find(driver => driver.number === driverNumber);
//     const driverGap = driver.gap;
//     const driverTime = time.minutes * 60 + time.seconds + time.fractions / 100;
//     return driverGap - driverTime;
// }