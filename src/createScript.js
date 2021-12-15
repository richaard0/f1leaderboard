const createEvent = document.querySelector(".create-event-btn");
const eventInput = document.querySelector(".enter-event");
const rootDiv = document.querySelector(".previous-results");
let eventInputValue = "";
let events = [];

if (!localStorage.getItem("events")) {
  localStorage.setItem("events", JSON.stringify(events));
}
events = JSON.parse(localStorage.getItem("events"));

if (!localStorage.getItem("enterEventField")) {
  localStorage.setItem("enterEventField", JSON.stringify(""));
}
eventInputValue = JSON.parse(localStorage.getItem("enterEventField"));
eventInput.value = eventInputValue;

createEvent.addEventListener("click", (e) => {
    // TODO: Add validation (min 5 chars)
    e.preventDefault();
    let event = {};
    event.title = eventInput.value;
    event.id = getNextId();
    event.date = new Date().toISOString().slice(0, 10);
    events.push(event);
    let currentEventId = event.id;
    localStorage.setItem("events", JSON.stringify(events));
    localStorage.setItem("currentEventId", currentEventId);
    window.location.href = "leaderboard.html";
})

eventInput.addEventListener("keyup", (e) => {
    // save to local storage after each key
    localStorage.setItem("enterEventField", JSON.stringify(eventInput.value));
})

displayEvents();

function getNextId() {
  const events = JSON.parse(localStorage.getItem("events"));
  console.log(events);
  let maxId = 0;
  events.forEach((event) => {
    if (event.id > maxId) {
      maxId = event.id;
    }
  });
  return maxId + 1;
}

function displayEvents(){
  const events = JSON.parse(localStorage.getItem("events"));
  events.forEach((event) => {
    let eventDiv = document.createElement("div");
    eventDiv.classList.add("event");
    eventDiv.setAttribute("id", event.id);
    let eventTitle = document.createElement("h3");
    eventTitle.innerText = event.title;
    eventDiv.appendChild(eventTitle);
    let eventDate = document.createElement("p");
    eventDate.innerText = event.date;
    eventDiv.appendChild(eventDate);
    eventDiv.addEventListener("click", (e) => {
      localStorage.setItem("currentEventId", event.id);
      window.location.href = "leaderboard.html";
    });
    rootDiv.appendChild(eventDiv);
  });
}