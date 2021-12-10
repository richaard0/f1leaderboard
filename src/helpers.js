// CRUD FUNCTIONS
function fetchAllLapTimes() {
    if (!localStorage.getItem('allLapTimes')){
        localStorage.setItem('allLapTimes', JSON.stringify([]));
    }
    let allLapTimesString = localStorage.getItem('allLapTimes');
    return JSON.parse(allLapTimesString);
}

function setAllLapTimes(allLapTimes) {
    localStorage.setItem('allLapTimes', JSON.stringify(allLapTimes));
}

function fetchFastestLapTimes() {
    if (!localStorage.getItem('fastestLapTimes')){
        localStorage.setItem('fastestLapTimes', JSON.stringify([]));
    }
    let fastestLapTimesString = localStorage.getItem('fastestLapTimes');
    return JSON.parse(fastestLapTimesString);
}

function setFastestLapTimes(fastestLapTimes) {
    localStorage.setItem('fastestLapTimes', JSON.stringify(fastestLapTimes));
}

function fetchDriverLaps() {
    if (!localStorage.getItem('driverLaps')){
        localStorage.setItem('driverLaps', JSON.stringify([]));
    }
    let driverLapsString = localStorage.getItem('driverLaps');
    return JSON.parse(driverLapsString);
}

function setDriverLaps(driverLaps) {
    localStorage.setItem('driverLaps', JSON.stringify(driverLaps));
}

// HELPER FUNCTIONS
function updateLeaderboard(){
    const allLapTimes = fetchAllLapTimes();
    const leaderboardTimes = getFastestLapsByDrivers(allLapTimes);
    console.log(leaderboardTimes,"leaderboardTimes");
    const fastestLap = getFastestLap(leaderboardTimes);
    leaderboardTableRoot.innerHTML = "";
    leaderboardTimes.forEach(lapData => {
        addRowToTable(lapData, fastestLap)
    })
}

function getFastestLapsByDrivers(times) {
    const fastestLapTimesByDriver = [];
    const sortedLapTimes = sortTimes(times);
    const drivers = getDrivers(times);
    console.log(drivers);
    // Get the fastest lap for each driver in order of fastest to slowest
    for (const driver of drivers) {
        const fastestLap = sortedLapTimes.find(lap => lap.driverNumber === driver);
        fastestLapTimesByDriver.push(fastestLap);
    }

    return sortTimes(fastestLapTimesByDriver);

    // Ugly but it works.
    // I get an array of each driver's fastest lap times then push the first index of that array into the fastestLapTimes array.
    // for (let driver of drivers) {
    //     const driverLapTimes = sortedLapTimes.filter(time => time.driverNumber === driver);
    //     console.log(driverLapTimes,"driverLapTimes");
    //     fastestLapTimes.push(driverLapTimes[0]);
    // }
    // return fastestLapTimes;
}

function getHelmetImage(driverNumber) {
    const driverName = getDriverName(driverNumber);
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
    const sortedTimes = [ ...times ];
    return sortedTimes.sort((a, b) => {
        return ((a.time.minutes * 60 * 1000) + (a.time.seconds * 1000) + a.time.fractions) -
            ((b.time.minutes * 60 * 1000) + (b.time.seconds * 1000) + b.time.fractions);
    });
}

function getDrivers(times) {
    const drivers = [];
    times.forEach(time => {
        if (!drivers.includes(time.driverNumber)) {
            drivers.push(time.driverNumber);
        }
    });
    return drivers;
}

function getDriverLapCount(driverNumber){
    let allLapTimes = fetchAllLapTimes();
    let lapCount = 0;
    allLapTimes.forEach(time => {
        if (time.driverNumber === driverNumber) {
            lapCount++;
        }
    });
    return lapCount;
}

function getCurrentLapId(){
    let allLapTimes = fetchAllLapTimes();
    let lapId = 0;
    allLapTimes.forEach(lapTime => {
        if (lapTime.id >= lapId) {
            lapId = lapTime.id;
        }
    });
    return lapId;
}

function getFastestLap(lapTimes) {
    return sortTimes(lapTimes)[0];
}

function calculateGapToFastestLap(fastestLap, lapTime) {
    const fastestLapTimeInMs = fastestLap.time.minutes * 60 * 1000 + fastestLap.time.seconds * 1000 + fastestLap.time.fractions;
    const lapTimeInMs = lapTime.minutes * 60 * 1000 + lapTime.seconds * 1000 + lapTime.fractions;
    return fastestLapTimeInMs - lapTimeInMs;
}