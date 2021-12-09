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

function getLapCount(driverNumber){
    let lapCount = 0;
    allLapTimes.forEach(time => {
        if (time.driverNumber === driverNumber) {
            lapCount++;
        }
    });
    return lapCount;
}

function getFastestLap(allLapTimes) {
    return sortTimes(allLapTimes)[0];
}

function calculateGapToFastestLap(fastestLap, lapTime) {
    const fastestLapTimeInMs = fastestLap.time.minutes * 60 * 1000 + fastestLap.time.seconds * 1000 + fastestLap.time.fractions;
    const lapTimeInMs = lapTime.minutes * 60 * 1000 + lapTime.seconds * 1000 + lapTime.fractions;
    return fastestLapTimeInMs - lapTimeInMs;
}