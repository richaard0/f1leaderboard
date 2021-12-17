const createEvent = document.querySelector(".create-event-btn");
const eventInput = document.querySelector(".enter-event");
const eventTitleContainer = document.querySelector(".event-title-container");
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

createEvent.disabled = true;

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
    localStorage.setItem("enterEventField", "");
    // clearFieldsValue();
    window.location.href = "leaderboard.html";
})

eventInput.addEventListener("keyup", (e) => {
    // save to local storage after each key
    localStorage.setItem("enterEventField", JSON.stringify(eventInput.value));
    if (eventInput.value.length < 5) {
        eventInput.parentElement.classList.add("tooltip-invalid");
        eventInput.parentElement.classList.add("title-invalid");
        createEvent.disabled = true;
    } else {
        eventInput.parentElement.classList.remove("tooltip-invalid");
        eventInput.parentElement.classList.remove("title-invalid");
        createEvent.disabled = false;

    }
})

// eventInput.addEventListener("keydown", (e) => {
//     // if below 5 chars, display invalid tooltip
//
// })

displayEvents();

