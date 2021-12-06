const createEvent = document.querySelector(".create-event-btn");
const eventInput = document.querySelector(".enter-event");
const event = {};
createEvent.addEventListener("click", (e) => {
    // TODO: Add validation (min 5 chars)
    e.preventDefault();
    event.title = eventInput.value;
    const string = JSON.stringify(event);
    localStorage.setItem("event", string);
    window.location.href = "leaderboard.html";
})