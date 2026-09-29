// ========================================
// PULSAR OS // BUILD 0.3
// ========================================


// ========================================
// CLOCK
// ========================================

function updateClock() {
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    document.querySelector("#clock").textContent =
        hours + ":" + minutes + ":" + seconds;
}

updateClock();

setInterval(updateClock, 1000);


// ========================================
// WINDOW ELEMENTS
// ========================================

const welcomeWindow =
    document.querySelector("#welcome");

const welcomeHeader =
    document.querySelector("#welcomeheader");

const welcomeClose =
    document.querySelector("#welcomeclose");

const welcomeOpen =
    document.querySelector("#welcomeopen");


// ========================================
// OPEN / CLOSE WINDOW
// ========================================

welcomeClose.addEventListener("click", function () {
    welcomeWindow.style.display = "none";
});


welcomeOpen.addEventListener("click", function () {
    welcomeWindow.style.display = "flex";
});


// ========================================
// DRAG WINDOW
// ========================================

let dragging = false;

let mouseStartX = 0;
let mouseStartY = 0;

let windowStartX = 0;
let windowStartY = 0;


welcomeHeader.addEventListener("mousedown", function (event) {

    // Don't start dragging when clicking
    // one of the window controls.
    if (event.target.closest(".window-controls")) {
        return;
    }

    dragging = true;

    mouseStartX = event.clientX;
    mouseStartY = event.clientY;

    windowStartX = welcomeWindow.offsetLeft;
    windowStartY = welcomeWindow.offsetTop;

});


document.addEventListener("mousemove", function (event) {

    if (!dragging) {
        return;
    }

    const deltaX =
        event.clientX - mouseStartX;

    const deltaY =
        event.clientY - mouseStartY;


    welcomeWindow.style.left =
        windowStartX + deltaX + "px";

    welcomeWindow.style.top =
        windowStartY + deltaY + "px";

});


document.addEventListener("mouseup", function () {
    dragging = false;
});