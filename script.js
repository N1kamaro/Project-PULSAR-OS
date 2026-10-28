// ============================================================
// PULSAR OS // BUILD 1.0 (Ultra litefication)
// Made by N1K
// ============================================================
// Welcome to the JavaScript :D
// Also check the index.html pliz!
// This is where the magic happens.
//=============================================================

// ts save everything in the browser (localStorage)
function saveData(key, value) {
    try {
        localStorage.setItem("pulsar." + key, JSON.stringify({ value: value, updatedAt: Date.now() }));
    } catch (error) {
        console.log("could not save", key, error);
    }
}

function loadData(key, fallback) {
    try {
        const raw = localStorage.getItem("pulsar." + key);
        if (raw === null) {
            return fallback;
        }
        const data = JSON.parse(raw);
        if (data && data.value !== undefined) {
            return data.value;
        }
        return fallback;
    } catch (error) {
        return fallback;
    }
}

function removeData(key) {
    localStorage.removeItem("pulsar." + key);
}

// here is small helper to wait some time (used with await :D)
function wait(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
}

function getTime() {
    return new Date().toLocaleTimeString("en-GB");
}

// creates a div/span/button with a class and a text
function makeElement(tag, className, text) {
    const element = document.createElement(tag);
    element.className = className;
    element.textContent = text || "";
    return element;
}

// "CORE ....... READY"
function dotted(label, value, size) {
    return (label + " ").padEnd(size, ".") + " " + value;
}

if (loadData("system.createdAt", null) === null) {
    saveData("system.createdAt", new Date().toISOString());
}
saveData("system.lastBoot", new Date().toISOString());

// if one of these ids is wrong the page stops and the console shows an error
// (that is on purpose, it is easier to find the problem)

// top bar, menu, desktop
const desktop = document.getElementById("desktop");
const topBar = document.getElementById("topBar");
const clock = document.getElementById("clock");
const screenFade = document.getElementById("screenFade");
const networkIndicator = document.getElementById("networkIndicator");
const systemMenu = document.getElementById("systemMenu");
const systemMenuButton = document.getElementById("systemMenuButton");

// windows
const welcomeWindow = document.getElementById("welcome");
const signalLogWindow = document.getElementById("signalLog");
const customizationWindow = document.getElementById("customization");
const notesWindow = document.getElementById("notesWindow");
const calculatorWindow = document.getElementById("calculatorWindow");
const terminalWindow = document.getElementById("terminalWindow");
const webWindow = document.getElementById("webWindow");
const serialWindow = document.getElementById("serialWindow");
const deviceManagerWindow = document.getElementById("deviceManagerWindow");
const guideWindow = document.getElementById("guideWindow");

// signal log
const signalLogTitle = document.getElementById("signalLogTitle");
const signalEntries = document.getElementById("signalEntries");
const signalReaderStatus = document.getElementById("signalReaderStatus");
const signalReader = document.getElementById("signalReader");

// customization
const wallpaperStatus = document.getElementById("wallpaperStatus");
const customizationFooter = document.getElementById("customizationFooter");
const wallpaperCards = document.querySelectorAll(".wallpaper-card");

// notes
const notesEditor = document.getElementById("notesEditor");
const notesStatus = document.getElementById("notesStatus");
const clearNotes = document.getElementById("clearNotes");

// calculator
const calculatorExpression = document.getElementById("calculatorExpression");
const calculatorResult = document.getElementById("calculatorResult");
const calculatorStatus = document.getElementById("calculatorStatus");
const calculatorButtons = document.querySelectorAll(".calculator-button");

// terminal
const terminalOutput = document.getElementById("terminalOutput");
const terminalInput = document.getElementById("terminalInput");
const terminalStatus = document.getElementById("terminalStatus");

// web
const webBack = document.getElementById("webBack");
const webForward = document.getElementById("webForward");
const webReload = document.getElementById("webReload");
const webHome = document.getElementById("webHome");
const webAddress = document.getElementById("webAddress");
const webGo = document.getElementById("webGo");
const webHistoryToggle = document.getElementById("webHistoryToggle");
const webStatus = document.getElementById("webStatus");
const webProtocol = document.getElementById("webProtocol");
const webHistoryPanel = document.getElementById("webHistoryPanel");
const webHistoryList = document.getElementById("webHistoryList");
const webHomeScreen = document.getElementById("webHomeScreen");
const webFrame = document.getElementById("webFrame");
const webFallback = document.getElementById("webFallback");
const webFallbackUrl = document.getElementById("webFallbackUrl");
const webOpenExternal = document.getElementById("webOpenExternal");
const webFooterStatus = document.getElementById("webFooterStatus");

// serial monitor
const serialMenuStatus = document.getElementById("serialMenuStatus");
const serialPortName = document.getElementById("serialPortName");
const serialBaudRate = document.getElementById("serialBaudRate");
const serialState = document.getElementById("serialState");
const serialStateText = document.getElementById("serialStateText");
const serialSelectPort = document.getElementById("serialSelectPort");
const serialConnect = document.getElementById("serialConnect");
const serialDisconnect = document.getElementById("serialDisconnect");
const serialVendorId = document.getElementById("serialVendorId");
const serialProductId = document.getElementById("serialProductId");
const serialDeviceLabel = document.getElementById("serialDeviceLabel");
const serialInterfaceStatus = document.getElementById("serialInterfaceStatus");
const serialLineEnding = document.getElementById("serialLineEnding");
const serialAutoScroll = document.getElementById("serialAutoScroll");
const serialTimestamp = document.getElementById("serialTimestamp");
const serialHexView = document.getElementById("serialHexView");
const serialClear = document.getElementById("serialClear");
const serialOutput = document.getElementById("serialOutput");
const serialTxInput = document.getElementById("serialTxInput");
const serialSend = document.getElementById("serialSend");
const serialRxBytes = document.getElementById("serialRxBytes");
const serialTxBytes = document.getElementById("serialTxBytes");
const serialRxMessages = document.getElementById("serialRxMessages");
const serialTxMessages = document.getElementById("serialTxMessages");
const serialLinkStatus = document.getElementById("serialLinkStatus");
const serialCoreStatus = document.getElementById("serialCoreStatus");

// device manager
const deviceManagerMenuStatus = document.getElementById("deviceManagerMenuStatus");
const deviceManagerName = document.getElementById("deviceManagerName");
const deviceManagerState = document.getElementById("deviceManagerState");
const deviceManagerStateText = document.getElementById("deviceManagerStateText");
const deviceManagerVendorId = document.getElementById("deviceManagerVendorId");
const deviceManagerProductId = document.getElementById("deviceManagerProductId");
const deviceManagerBaud = document.getElementById("deviceManagerBaud");
const deviceManagerAlias = document.getElementById("deviceManagerAlias");
const deviceManagerLastSeen = document.getElementById("deviceManagerLastSeen");
const deviceManagerSelect = document.getElementById("deviceManagerSelect");
const deviceManagerConnect = document.getElementById("deviceManagerConnect");
const deviceManagerDisconnect = document.getElementById("deviceManagerDisconnect");
const deviceManagerOpenSerial = document.getElementById("deviceManagerOpenSerial");
const deviceManagerLink = document.getElementById("deviceManagerLink");

//boot here deleted :D

// clock
function updateClock() {
    clock.textContent = getTime();
}
updateClock();
setInterval(updateClock, 1000);

let zTop = 20;

// when a window is maximized, its old size and position are saved here (always remember, NOT THE OS!)
const oldSizes = {};

function focusWindow(win) {
    zTop = zTop + 1;
    win.style.zIndex = zTop;
}

function openWindow(win) {
    win.classList.remove("window-exit");
    win.style.display = "flex";
    focusWindow(win);
}

function closeWindow(win) {
    win.style.display = "none";
}

// tiny closing window anim  
function closeWindowSlowly(win) {
    win.classList.add("window-exit");
    setTimeout(function () {
        closeWindow(win);
        win.classList.remove("window-exit");
    }, 220);
}

// the desktop starts UNDER the top bar (css margin-top -42px)
// so the windows cant go to top 0, or the title bar gets hidden
function makeBigWindow(win) {
    win.style.left = "0px";
    win.style.top = topBar.offsetHeight + "px";
    win.style.width = desktop.clientWidth + "px";
    win.style.height = (desktop.clientHeight - topBar.offsetHeight) + "px";
    win.style.maxWidth = "none";
    win.style.maxHeight = "none";
}

function toggleMaximize(win) {
    if (oldSizes[win.id]) {
        // go back to the old size
        const old = oldSizes[win.id];
        win.style.left = old.left + "px";
        win.style.top = old.top + "px";
        win.style.width = old.width + "px";
        win.style.height = old.height + "px";
        win.style.maxWidth = "";
        win.style.maxHeight = "";
        win.classList.remove("window-maximized");
        delete oldSizes[win.id];
    } else {
        oldSizes[win.id] = {
            left: win.offsetLeft,
            top: win.offsetTop,
            width: win.offsetWidth,
            height: win.offsetHeight
        };
        win.classList.add("window-maximized");
        makeBigWindow(win);
    }
    focusWindow(win);
}

// set up every window (drag, buttons...)
const allWindows = document.querySelectorAll(".window");

allWindows.forEach(function (win) {
    const bar = win.querySelector(".window-bar");
    let dragging = false;
    let offsetX = 0;
    let offsetY = 0;

    win.addEventListener("pointerdown", function () {
        focusWindow(win);
    });

    bar.addEventListener("pointerdown", function (event) {
        if (event.target.closest(".window-controls")) {
            return;
        }
        if (oldSizes[win.id]) {
            return; // maximized windows dont move
        }
        event.preventDefault();
        dragging = true;
        offsetX = event.clientX - win.offsetLeft;
        offsetY = event.clientY - win.offsetTop;
        bar.setPointerCapture(event.pointerId);
    });

    bar.addEventListener("pointermove", function (event) {
        if (!dragging) {
            return;
        }
        let left = event.clientX - offsetX;
        let top = event.clientY - offsetY;

        // dont let it leave the screen
        const maxLeft = Math.max(0, desktop.clientWidth - win.offsetWidth);
        const maxTop = Math.max(topBar.offsetHeight, desktop.clientHeight - win.offsetHeight);
        left = Math.min(Math.max(0, left), maxLeft);
        top = Math.min(Math.max(topBar.offsetHeight, top), maxTop);

        win.style.left = left + "px";
        win.style.top = top + "px";
    });

    bar.addEventListener("pointerup", function () {
        dragging = false;
    });

    bar.addEventListener("pointercancel", function () {
        dragging = false;
    });

    bar.addEventListener("dblclick", function (event) {
        if (!event.target.closest(".window-controls")) {
            toggleMaximize(win);
        }
    });

    // minimize just hides, open it again from the menu
    win.querySelector(".window-minimize").addEventListener("click", function () {
        closeWindow(win);
    });

    win.querySelector(".window-maximize").addEventListener("click", function () {
        toggleMaximize(win);
    });

    win.querySelector(".window-close").addEventListener("click", function () {
        closeWindowSlowly(win);
    });
});

// when the browser changes size
window.addEventListener("resize", function () {
    allWindows.forEach(function (win) {
        if (win.style.display !== "flex") {
            return;
        }
          if (oldSizes[win.id]) {
        makeBigWindow(win);
        return;
        }
        const maxLeft = Math.max(0, desktop.clientWidth - win.offsetWidth);
        const maxTop = Math.max(topBar.offsetHeight, desktop.clientHeight - win.offsetHeight);
        win.style.left = Math.min(Math.max(0, win.offsetLeft), maxLeft) + "px";
        win.style.top = Math.min(Math.max(topBar.offsetHeight, win.offsetTop), maxTop) + "px";
    });
});

function closeMenu() {
    systemMenu.classList.remove("open");
systemMenuButton.classList.remove("active");
}

systemMenuButton.addEventListener("click", function () {
    if (systemMenu.classList.contains("open")) {
        closeMenu();
    } else {
        systemMenu.classList.add("open");
        systemMenuButton.classList.add("active");
    }
});

// click outside = close the menu
document.addEventListener("pointerdown", function (event) {
    const insideMenu = systemMenu.contains(event.target);
    const insideButton = systemMenuButton.contains(event.target);
    if (!insideMenu && !insideButton) {
        closeMenu();
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeMenu();
    }
});

// the calculator needs this to receive the keyboard
calculatorWindow.tabIndex = -1;

// one handler for each app in the menu
document.getElementById("openAbout").addEventListener("click", function () {
    openWindow(welcomeWindow);
    closeMenu();
});

document.getElementById("openSignalLog").addEventListener("click", function () {
    openWindow(signalLogWindow);
    closeMenu();
});

document.getElementById("openNotes").addEventListener("click", function () {
    openWindow(notesWindow);
    closeMenu();
    setTimeout(function () { notesEditor.focus(); }, 50);
});

document.getElementById("openCalculator").addEventListener("click", function () {
    openWindow(calculatorWindow);
    closeMenu();
    setTimeout(function () { calculatorWindow.focus(); }, 50);
});

document.getElementById("openTerminal").addEventListener("click", function () {
    openWindow(terminalWindow);
    closeMenu();
    setTimeout(function () { terminalInput.focus(); }, 50);
});

document.getElementById("openWeb").addEventListener("click", function () {
    openWindow(webWindow);
    closeMenu();
    setTimeout(function () { webAddress.focus(); }, 50);
});

document.getElementById("openSerial").addEventListener("click", function () {
    openWindow(serialWindow);
    closeMenu();
});

document.getElementById("openDeviceManager").addEventListener("click", function () {
    openWindow(deviceManagerWindow);
    closeMenu();
});

document.getElementById("openGuide").addEventListener("click", function () {
    openWindow(guideWindow);
    closeMenu();
});

document.getElementById("openCustomization").addEventListener("click", function () {
    openWindow(customizationWindow);
    closeMenu();
});

document.getElementById("enterSystem").addEventListener("click", function () {
    closeWindowSlowly(welcomeWindow);
    closeMenu();
});

// guide tabs
const guideButtons = document.querySelectorAll(".guide-nav");
const guidePages = document.querySelectorAll(".guide-page");

guideButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        guideButtons.forEach(function (b) { b.classList.remove("active"); });
        guidePages.forEach(function (p) { p.classList.remove("active"); });

        button.classList.add("active");
        document.querySelector('[data-guide-page="' + button.dataset.guide + '"]').classList.add("active");
    });
});

// customization tabs (same idea as the guide)
const customButtons = document.querySelectorAll("[data-custom-page]");
const customPages = document.querySelectorAll("[data-custom-content]");

customButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        customButtons.forEach(function (b) { b.classList.remove("active"); });
        customPages.forEach(function (p) { p.classList.remove("active"); });

        button.classList.add("active");
        document.querySelector('[data-custom-content="' + button.dataset.customPage + '"]').classList.add("active");
    });
});


let notesTimer = null;

notesEditor.value = loadData("apps.notes.content", "");

function saveNotes() {
    saveData("apps.notes.content", notesEditor.value);
    notesStatus.textContent = "SAVED";
}

// saves 0.35s after you stop typing
notesEditor.addEventListener("input", function () {
    notesStatus.textContent = "EDITING";
    clearTimeout(notesTimer);
    notesTimer = setTimeout(saveNotes, 350);
});

clearNotes.addEventListener("click", function () {
    notesEditor.value = "";
    saveNotes();
    notesEditor.focus();
});

let calcCurrent = "0"; // number on the screen
let calcStored = null; // first number
let calcOperator = null;
let calcWaiting = false; // true = next digit starts a new number

function operatorSymbol(op) {
    if (op === "-") return "−";
    if (op === "*") return "×";
    if (op === "/") return "÷";
    return op;
}

function showCalculator(status) {
    calculatorResult.textContent = calcCurrent;

    if (calcStored !== null && calcOperator !== null) {
        calculatorExpression.textContent = calcStored + " " + operatorSymbol(calcOperator);
    } else {
        calculatorExpression.textContent = "";
    }

    if (status) {
        calculatorStatus.textContent = status;
    }
}

// returns null if it is a division by zero
function calculate(a, b, op) {
    let result = 0;

    if (op === "+") result = a + b;
    if (op === "-") result = a - b;
    if (op === "*") result = a * b;
    if (op === "/") {
        if (b === 0) {
            return null;
        }
        result = a / b;
    }

    // so 0.1 + 0.2 is 0.3 and not 0.30000000000000004
    return Math.round(result * 1000000000000) / 1000000000000;
}

function calcClear() {
    calcCurrent = "0";
    calcStored = null;
    calcOperator = null;
    calcWaiting = false;
    showCalculator("READY");
}

function calcError() {
    calcClear();
    calculatorStatus.textContent = "ERROR";
    calculatorExpression.textContent = "INVALID OPERATION";
    calculatorResult.textContent = "ERROR";
}

function calcDigit(digit) {
    if (calcWaiting || calcCurrent === "0") {
        calcCurrent = digit;
    } else {
        calcCurrent = calcCurrent + digit;
    }
    calcWaiting = false;
    showCalculator("READY");
}

function calcDot() {
    if (calcWaiting) {
        calcCurrent = "0.";
        calcWaiting = false;
    } else if (calcCurrent.indexOf(".") === -1) {
        calcCurrent = calcCurrent + ".";
    }
    showCalculator("READY");
}

function calcChooseOperator(op) {
    // pressed two operators, just change it
    if (calcOperator !== null && calcWaiting) {
        calcOperator = op;
        showCalculator();
        return;
    }

    const value = Number(calcCurrent);

    if (calcStored === null) {
        calcStored = value;
    } else if (calcOperator !== null) {
        const result = calculate(calcStored, value, calcOperator);
        if (result === null) {
            calcError();
            return;
        }
        calcStored = result;
        calcCurrent = String(result);
    }

    calcOperator = op;
    calcWaiting = true;
    showCalculator("OPERATOR");
}

function calcEquals() {
    if (calcStored === null || calcOperator === null) {
        return;
    }

    const a = calcStored;
    const b = Number(calcCurrent);
    const op = calcOperator;
    const result = calculate(a, b, op);

    if (result === null) {
        calcError();
        return;
    }

    calcCurrent = String(result);
    calcStored = null;
    calcOperator = null;
    calcWaiting = true;

    showCalculator("SOLVED");
    calculatorExpression.textContent = a + " " + operatorSymbol(op) + " " + b + " =";
}

function calcBackspace() {
    if (calcWaiting) {
        return;
    }
    if (calcCurrent.length <= 1) {
        calcCurrent = "0";
    } else {
        calcCurrent = calcCurrent.slice(0, -1);
    }
    showCalculator();
}

calculatorButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const value = button.dataset.value;
        const action = button.dataset.action;

        if (value !== undefined) {
            if (value === ".") {
                calcDot();
            } else if (value === "+" || value === "-" || value === "*" || value === "/") {
                calcChooseOperator(value);
            } else {
                calcDigit(value);
            }
        }

        if (action === "clear") calcClear();
        if (action === "backspace") calcBackspace();
        if (action === "equals") calcEquals();
    });
});

// keyboard (only when the calculator window is selected)
calculatorWindow.addEventListener("keydown", function (event) {
    const key = event.key;

    if (event.ctrlKey || event.metaKey || event.altKey) {
        return; // ts is so ctrl + c still works (this were a lil big headache :D)
    }

    if (key >= "0" && key <= "9" && key.length === 1) {
        calcDigit(key);
    } else if (key === "." || key === ",") {
        calcDot();
    } else if (key === "+" || key === "-" || key === "*" || key === "/") {
        calcChooseOperator(key);
    } else if (key === "Enter" || key === "=") {
        calcEquals();
    } else if (key === "Backspace") {
        calcBackspace();
    } else if (key === "Escape" || key === "c" || key === "C") {
        calcClear();
    } else {
        return;
    }

    event.preventDefault();
});

showCalculator();

const logs = [
    {
        code: "LOG // 001",
        title: "SYSTEM INIT",
        status: "TRANSMISSION // 001",
        content:
            "<h2>SYSTEM INIT</h2>" +
            "<p>PULSAR CORE INITIALIZED.</p>" +
            "<p>Desktop environment online. Window manager responding. Signal interface standing by.</p>" +
            '<div class="signal-data">' +
            dotted("CORE", "READY", 18) + "<br>" +
            dotted("DESKTOP", "ONLINE", 18) + "<br>" +
            dotted("WINDOW MANAGER", "ONLINE", 18) + "<br>" +
            dotted("SIGNAL", "STABLE", 18) +
            "</div>" +
            '<p class="signal-muted">END OF TRANSMISSION // 001</p>'
    },
    {
        code: "LOG // 002",
        title: "PROJECT PULSAR",
        status: "TRANSMISSION // 002",
        content:
            "<h2>PROJECT PULSAR</h2>" +
            "<p>PULSAR is a web-based operating system designed as an interface between a computer and external microcontrollers.</p>" +
            "<p>The system combines a desktop environment with hardware tools, monitoring interfaces and communication utilities.</p>" +
            '<div class="signal-data">' +
            dotted("PROJECT", "PULSAR OS", 18) + "<br>" +
            dotted("PLATFORM", "WEB", 18) + "<br>" +
            dotted("INTERFACE", "HARDWARE", 18) + "<br>" +
            dotted("BUILD", "1.0", 18) +
            "</div>" +
            '<p class="signal-muted">A STAR. A SIGNAL. AN INTERFACE.</p>'
    },
    {
        code: "LOG // 003",
        title: "HARDWARE INTERFACE",
        status: "TRANSMISSION // 003",
        content:
            "<h2>HARDWARE INTERFACE</h2>" +
            "<p>Hardware communication services are online.</p>" +
            "<p>PULSAR can connect to supported microcontrollers through Web Serial, exchange serial data and manage connected devices.</p>" +
            '<div class="signal-data">' +
            dotted("SERIAL", "ONLINE", 18) + "<br>" +
            dotted("RX / TX", "ENABLED", 18) + "<br>" +
            dotted("DEVICE MANAGER", "ONLINE", 18) + "<br>" +
            dotted("INTERFACE", "WEB SERIAL", 18) + "<br>" +
            dotted("LINK", "AVAILABLE", 18) +
            "</div>" +
            '<p class="signal-muted">HARDWARE INTERFACE // READY.</p>'
    }
];

function showLog(index) {
    const log = logs[index];

    signalReader.innerHTML = log.content;
    signalReaderStatus.textContent = log.status;
    signalLogTitle.textContent = "PULSAR // SIGNAL LOG // " + log.title;

    const entries = document.querySelectorAll(".signal-entry");
    for (let i = 0; i < entries.length; i++) {
        entries[i].classList.remove("active");
    }
    entries[index].classList.add("active");
}

// creates the list on the left
for (let i = 0; i < logs.length; i++) {
    const entry = makeElement("div", "signal-entry");
    entry.appendChild(makeElement("div", "signal-entry-title", logs[i].title));
    entry.appendChild(makeElement("div", "signal-entry-code", logs[i].code));

    entry.addEventListener("click", function () {
        showLog(i);
    });

    signalEntries.appendChild(entry);
}

// the names (TOBS, TSF...) need to be the same as the data-wallpaper in the
// html and the .wallpaper-NAME class in the css, if not nothing happens! roger that?
const wallpapers = {
    TOBS: "TAPESTRY OF BLAZING STARBIRTH",
    TSF: "THE STELLAR FORGE",
    LSP: "LATEST SATURN PORTRAIT",
    MM: "MYSTIC MOUNTAIN"
};

let currentWallpaper = "TOBS";
let wallpaperChanging = false;

function applyWallpaper(name) {
    for (const key in wallpapers) {
        desktop.classList.remove("wallpaper-" + key);
    }
    desktop.classList.add("wallpaper-" + name);

    wallpaperCards.forEach(function (card) {
        if (card.dataset.wallpaper === name) {
            card.classList.add("active");
        } else {
            card.classList.remove("active");
        }
    });

    wallpaperStatus.textContent = "ACTIVE // " + wallpapers[name];
    customizationFooter.textContent = "WALLPAPER // " + wallpapers[name];

    currentWallpaper = name;
    saveData("system.wallpaper", name);
}

// screen goes black, changes, and comes back
async function changeWallpaper(name) {
    if (wallpaperChanging || !wallpapers[name]) {
        return;
    }
    wallpaperChanging = true;

    screenFade.classList.add("active");
    await wait(220);
    applyWallpaper(name);
    await wait(80);
    screenFade.classList.remove("active");
    await wait(230);

    wallpaperChanging = false;
}

wallpaperCards.forEach(function (card) {
    card.addEventListener("click", function () {
        changeWallpaper(card.dataset.wallpaper);
    });
});

// loads the saved one (the old names from the first build are converted)
let savedWallpaper = loadData("system.wallpaper", "TOBS");
if (savedWallpaper === "pulsar") savedWallpaper = "TOBS";
if (savedWallpaper === "galaxy") savedWallpaper = "TSF";
if (savedWallpaper === "saturn") savedWallpaper = "LSP";
if (savedWallpaper === "void") savedWallpaper = "MM";
if (!wallpapers[savedWallpaper]) savedWallpaper = "TOBS";
applyWallpaper(savedWallpaper);

// "OPEN IN PULSAR WEB" buttons
document.querySelectorAll(".wallpaper-source-web").forEach(function (button) {
    button.addEventListener("click", function () {
        openWindow(webWindow);
        closeMenu();
        navigateWeb(button.dataset.url, true);
    });
});

const serialSupported = "serial" in navigator;

let port = null;
let reader = null;
let writer = null;
let readPromise = null;
let serialStateName = serialSupported ? "DISCONNECTED" : "UNSUPPORTED";
let baudRate = 115200;

const decoder = new TextDecoder();
const encoder = new TextEncoder();

let rxBytes = 0;
let rxMessages = 0;
let txBytes = 0;
let txMessages = 0;
let rxBuffer = ""; // part of a line that didnt finish yet
let serialLogStarted = false; // first line removes the "STANDBY" text

function formatId(number) {
    if (number === undefined) {
        return "UNKNOWN";
    }
    return "0x" + number.toString(16).toUpperCase().padStart(4, "0");
}

function bytesToHex(bytes) {
    let text = "";
    for (let i = 0; i < bytes.length; i++) {
        text = text + bytes[i].toString(16).toUpperCase().padStart(2, "0") + " ";
    }
    return text.trim();
}

function getLineEnding() {
    if (serialLineEnding.value === "lf") return "\n";
    if (serialLineEnding.value === "crlf") return "\r\n";
    return "";
}

function showSerialCounters() {
    serialRxBytes.textContent = rxBytes + " B";
    serialTxBytes.textContent = txBytes + " B";
    serialRxMessages.textContent = rxMessages;
    serialTxMessages.textContent = txMessages;
}

// writes a line in the serial monitor
function logSerial(text, type) {
    if (!serialLogStarted) {
        serialOutput.innerHTML = "";
        serialLogStarted = true;
    }

    let stamp = "";
    if (serialTimestamp.value === "on") {
        stamp = "[" + getTime() + "] ";
    }

    serialOutput.appendChild(
        makeElement("div", "serial-line serial-" + type, stamp + type.toUpperCase() + " // " + text)
    );

    // if there are too many lines the page gets slow
    while (serialOutput.childElementCount > 2000) {
        serialOutput.removeChild(serialOutput.firstElementChild);
    }

    if (serialAutoScroll.value === "on") {
        serialOutput.scrollTop = serialOutput.scrollHeight;
    }
}

// updates both windows (serial monitor and device manager)
function updateSerialScreen() {
    const connected = serialStateName === "CONNECTED";
    const busy =
        serialStateName === "REQUESTING" ||
        serialStateName === "CONNECTING" ||
        serialStateName === "DISCONNECTING";
    const canPick = !busy && !connected && serialStateName !== "UNSUPPORTED";
    const canConnect = canPick && port !== null;

    let vendor = "UNKNOWN";
    let product = "UNKNOWN";
    if (port) {
        const info = port.getInfo();
        vendor = formatId(info.usbVendorId);
        product = formatId(info.usbProductId);
    }
    const deviceName = port ? "SERIAL DEVICE" : "NO DEVICE";

    // serial monitor
    serialState.dataset.state = serialStateName.toLowerCase();
    serialStateText.textContent = serialStateName;
    serialPortName.textContent = deviceName;
    serialVendorId.textContent = vendor;
    serialProductId.textContent = product;
    serialDeviceLabel.textContent = port ? "AUTHORIZED PORT" : "NO DEVICE";
    serialInterfaceStatus.textContent = serialStateName === "UNSUPPORTED" ? "UNSUPPORTED" : "WEB SERIAL";

    serialSelectPort.disabled = !canPick;
    serialConnect.disabled = !canConnect;
    serialDisconnect.disabled = !connected;
    serialBaudRate.disabled = connected || busy;
    serialTxInput.disabled = !connected;
    serialSend.disabled = !connected;

    serialLinkStatus.textContent = connected ? "ACTIVE" : "INACTIVE";
    serialMenuStatus.textContent = connected ? "ACTIVE" : "READY";

    if (serialStateName === "ERROR" || serialStateName === "UNSUPPORTED") {
        serialCoreStatus.textContent = serialStateName;
    } else {
        serialCoreStatus.textContent = "READY";
    }

    // device manager
    deviceManagerName.textContent = deviceName;
    deviceManagerStateText.textContent = serialStateName;
    deviceManagerVendorId.textContent = vendor;
    deviceManagerProductId.textContent = product;
    deviceManagerBaud.textContent = serialBaudRate.value;
    deviceManagerLink.textContent = connected ? "LINK // ACTIVE" : "LINK // INACTIVE";
    deviceManagerMenuStatus.textContent = connected ? "CONNECTED" : "READY";

    if (connected) {
        deviceManagerState.classList.add("connected");
        deviceManagerLastSeen.textContent = getTime();
    } else {
        deviceManagerState.classList.remove("connected");
    }

    if (serialStateName === "ERROR") {
        deviceManagerState.classList.add("error");
    } else {
        deviceManagerState.classList.remove("error");
    }

    deviceManagerSelect.disabled = !canPick;
    deviceManagerConnect.disabled = !canConnect;
    deviceManagerDisconnect.disabled = !connected;

    loadAlias();
}

function setSerialState(name) {
    serialStateName = name;
    updateSerialScreen();
}

async function selectPort() {
    if (!serialSupported) {
        return;
    }

    setSerialState("REQUESTING");

    try {
        port = await navigator.serial.requestPort();
    } catch (error) {
        // closing the window without choosing is not an error
        if (error.name !== "NotFoundError") {
            console.error(error);
            logSerial(error.message || "SERIAL ERROR", "error");
            setSerialState("ERROR");
            return;
        }
    }

    setSerialState("DISCONNECTED");
}

// reads data from the device until we disconnect
async function readLoop() {
    reader = port.readable.getReader();

    try {
        while (true) {
            const result = await reader.read();
            if (result.done) {
                break;
            }
            if (result.value && result.value.length > 0) {
                receiveData(result.value);
            }
        }
    } catch (error) {
        // happens when the cable is pulled
        if (serialStateName === "CONNECTED") {
            console.error(error);
            logSerial(error.message || "SERIAL ERROR", "error");
            setSerialState("ERROR");
        }
    } finally {
        reader.releaseLock();
        reader = null;
    }
}

// the order here is important: stop reader, wait the loop, free writer, close port
async function closeEverything() {
    try {
        if (reader) {
            await reader.cancel();
        }
    } catch (error) {
        // already closed
    }

    try {
        await readPromise;
    } catch (error) {
        // nothong
    }

    try {
        if (writer) {
            writer.releaseLock();
        }
    } catch (error) {
        // nothung
    }
    writer = null;

    try {
        if (port) {
            await port.close();
        }
    } catch (error) {
        // port was not open
    }
}

async function connectPort() {
    if (!port) {
        return;
    }
    if (serialStateName === "CONNECTED" || serialStateName === "CONNECTING") {
        return;
    }
    if (serialStateName === "ERROR") {
        await closeEverything();
    }

    baudRate = Number(serialBaudRate.value);
    setSerialState("CONNECTING");

    try {
        // 8 data bits, 1 stop bit, no parity = default
        await port.open({ baudRate: baudRate });
        writer = port.writable.getWriter();
        setSerialState("CONNECTED");
        readPromise = readLoop();
    } catch (error) {
        console.error(error);
        logSerial(error.message || "SERIAL ERROR", "error");
        setSerialState("ERROR");
    }
}

async function disconnectPort() {
    if (serialStateName === "DISCONNECTED") {
        return;
    }
    setSerialState("DISCONNECTING");
    await closeEverything();
    setSerialState("DISCONNECTED");
}

// sends text to the device, returns how many bytes were sent
async function writeSerial(text) {
    if (serialStateName !== "CONNECTED" || !writer) {
        throw new Error("SERIAL LINK NOT CONNECTED");
    }
    const data = encoder.encode(text);
    await writer.write(data);
    return data.byteLength;
}

// sends and shows in the monitor
async function transmit(text, ending) {
    const bytes = await writeSerial(text + ending);

    txBytes = txBytes + bytes;
    txMessages = txMessages + 1;

    logSerial(text, "tx");
    showSerialCounters();
}

async function sendFromMonitor() {
    const text = serialTxInput.value;

    if (text === "" || serialStateName !== "CONNECTED") {
        return;
    }

    try {
        await transmit(text, getLineEnding());
        serialTxInput.value = "";
        serialTxInput.focus();
    } catch (error) {
        logSerial("SEND FAILED // " + (error.message || "UNKNOWN ERROR"), "error");
    }
}

// data arrives in pieces, so we keep the unfinished line in rxBuffer
function receiveData(bytes) {
    const text = decoder.decode(bytes, { stream: true });
    const hex = serialHexView.value === "on";

    rxBytes = rxBytes + bytes.byteLength;

    if (hex) {
        rxMessages = rxMessages + 1;
        logSerial(bytesToHex(bytes), "rx");
    }

    rxBuffer = rxBuffer + text;
    const lines = rxBuffer.split(/\r?\n/);
    rxBuffer = lines.pop();

    for (let i = 0; i < lines.length; i++) {
        if (!hex) {
            rxMessages = rxMessages + 1;
            logSerial(lines[i], "rx");
        }

        // the device protocol: lines that start with @PULSAR go to the terminal too
        if (lines[i].startsWith("@PULSAR ")) {
            terminalWrite("DEVICE // " + lines[i].slice(8));
        }
    }

    showSerialCounters();
}

// buttons (they exist in the serial monitor AND in the device manager) 
serialSelectPort.addEventListener("click", selectPort);
deviceManagerSelect.addEventListener("click", selectPort);

serialConnect.addEventListener("click", connectPort);
deviceManagerConnect.addEventListener("click", connectPort);

serialDisconnect.addEventListener("click", disconnectPort);
deviceManagerDisconnect.addEventListener("click", disconnectPort);

deviceManagerOpenSerial.addEventListener("click", function () {
    openWindow(serialWindow);
});

serialSend.addEventListener("click", sendFromMonitor);

serialTxInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendFromMonitor();
    }
});

serialClear.addEventListener("click", function () {
    serialOutput.innerHTML = "";
    serialLogStarted = true;
    rxBuffer = "";
    rxBytes = 0;
    rxMessages = 0;
    txBytes = 0;
    txMessages = 0;
    showSerialCounters();
});

// serial settings are saved so they come back next time
function saveSerialSettings() {
    saveData("hardware.serial.settings", {
        baudRate: serialBaudRate.value,
        lineEnding: serialLineEnding.value,
        autoScroll: serialAutoScroll.value,
        timestamp: serialTimestamp.value,
        hexView: serialHexView.value
    });
}

const savedSerial = loadData("hardware.serial.settings", null);
if (savedSerial) {
    if (savedSerial.baudRate) serialBaudRate.value = savedSerial.baudRate;
    if (savedSerial.lineEnding) serialLineEnding.value = savedSerial.lineEnding;
    if (savedSerial.autoScroll) serialAutoScroll.value = savedSerial.autoScroll;
    if (savedSerial.timestamp) serialTimestamp.value = savedSerial.timestamp;
    if (savedSerial.hexView) serialHexView.value = savedSerial.hexView;
}

serialBaudRate.addEventListener("change", saveSerialSettings);
serialLineEnding.addEventListener("change", saveSerialSettings);
serialAutoScroll.addEventListener("change", saveSerialSettings);
serialTimestamp.addEventListener("change", saveSerialSettings);
serialHexView.addEventListener("change", saveSerialSettings);

// each device has its own alias, saved with the vendor id + product id
function getAliasKey() {
    if (!port) {
        return null;
    }
    const info = port.getInfo();
    if (info.usbVendorId === undefined || info.usbProductId === undefined) {
        return null;
    }
    return "hardware.devices." + info.usbVendorId.toString(16).toUpperCase() + "-" + info.usbProductId.toString(16).toUpperCase() + ".alias";
}

function loadAlias() {
    const key = getAliasKey();

    if (key === null) {
        deviceManagerAlias.value = "";
        deviceManagerAlias.disabled = true;
    } else {
        deviceManagerAlias.disabled = false;
        deviceManagerAlias.value = loadData(key, "");
    }
}

deviceManagerAlias.addEventListener("input", function () {
    const key = getAliasKey();
    if (key === null) {
        return;
    }

    const alias = deviceManagerAlias.value.trim();
    if (alias === "") {
        removeData(key);
    } else {
        saveData(key, alias);
    }
});

showSerialCounters();
updateSerialScreen();

// HEADACHE BE CAREFUL HERE

const oldCommands = [];
let oldCommandIndex = 0;

function terminalWrite(text) {
    terminalOutput.appendChild(makeElement("div", "terminal-line", text));
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

// PING, INFO, STATUS...
function sendToDevice(command) {
    if (serialStateName !== "CONNECTED") {
        terminalWrite("DEVICE // NOT CONNECTED");
        terminalStatus.textContent = "READY";
        return;
    }

    terminalStatus.textContent = "TX";

    transmit(command, "\n")
        .then(function () {
            terminalWrite("TX // " + command);
            terminalStatus.textContent = "READY";
        })
        .catch(function (error) {
            terminalWrite("DEVICE ERROR // " + (error.message || "WRITE FAILED"));
            terminalStatus.textContent = "ERROR";
        });
}

function runCommand(rawText) {
    const text = rawText.trim();
    const command = text.toLowerCase();

    if (text === "") {
        return;
    }

    terminalStatus.textContent = "EXEC";

    if (command === "help") {
        terminalWrite("help                // LIST COMMANDS");
        terminalWrite("clear               // CLEAR TERMINAL");
        terminalWrite("date                // SYSTEM DATE");
        terminalWrite("system              // PULSAR INFORMATION");
        terminalWrite("apps                // LIST APPLICATIONS");
        terminalWrite("serial status       // SERIAL LINK INFORMATION");
        terminalWrite("devices             // ACTIVE DEVICE");
        terminalWrite("ping                // TEST DEVICE LINK");
        terminalWrite("device info         // DEVICE INFORMATION");
        terminalWrite("device status       // DEVICE STATUS");
        terminalWrite("open notes          // OPEN NOTES");
        terminalWrite("open calculator     // OPEN CALCULATOR");
        terminalWrite("open signal         // OPEN SIGNAL LOG");
        terminalWrite("open customization  // OPEN CUSTOMIZATION");
        terminalWrite("open web            // OPEN PULSAR WEB");
        terminalWrite("open serial         // OPEN SERIAL MONITOR");
        terminalWrite("open devices        // OPEN DEVICE MANAGER");
        terminalWrite("open guide          // OPEN PULSAR GUIDE");
    } else if (command === "clear") {
        terminalOutput.innerHTML = "";
    } else if (command === "date") {
        terminalWrite(new Date().toString());
    } else if (command === "system") {
        terminalWrite("PULSAR OS // BUILD 1.0");
        terminalWrite(dotted("CORE", "ONLINE", 17));
        terminalWrite(dotted("WINDOW MANAGER", "ONLINE", 17));
        terminalWrite(dotted("STORAGE", "ONLINE", 17));
        terminalWrite(dotted("SHELL", "ONLINE", 17));
        terminalWrite(dotted("SERIAL CORE", serialSupported ? "ONLINE" : "UNSUPPORTED", 17));
        terminalWrite(dotted("HARDWARE LINK", serialStateName === "CONNECTED" ? "ACTIVE" : "STANDBY", 17));
    } else if (command === "apps") {
        terminalWrite("PULSAR WEB");
        terminalWrite("SIGNAL LOG");
        terminalWrite("NOTES");
        terminalWrite("CALCULATOR");
        terminalWrite("TERMINAL");
        terminalWrite("SERIAL MONITOR");
        terminalWrite("DEVICE MANAGER");
        terminalWrite("GUIDE");
        terminalWrite("CUSTOMIZATION");
    } else if (command === "serial status") {
        let vendor = "UNKNOWN";
        let product = "UNKNOWN";
        if (port) {
            vendor = formatId(port.getInfo().usbVendorId);
            product = formatId(port.getInfo().usbProductId);
        }
        terminalWrite(dotted("SERIAL STATE", serialStateName, 17));
        terminalWrite(dotted("BAUD", baudRate, 17));
        terminalWrite(dotted("VID", vendor, 17));
        terminalWrite(dotted("PID", product, 17));
        terminalWrite(dotted("LINK", serialStateName === "CONNECTED" ? "ACTIVE" : "INACTIVE", 17));
    } else if (command === "devices") {
        if (!port) {
            terminalWrite("NO DEVICE SELECTED");
        } else {
            terminalWrite("DEVICE // SERIAL DEVICE");
            terminalWrite("STATE .... " + serialStateName);
            if (deviceManagerAlias.value.trim() !== "") {
                terminalWrite("ALIAS .... " + deviceManagerAlias.value.trim());
            }
        }
    } else if (command === "ping") {
        sendToDevice("PING");
        return;
    } else if (command === "device info") {
        sendToDevice("INFO");
        return;
    } else if (command === "device status") {
        sendToDevice("STATUS");
        return;
    } else if (command === "open notes") {
        terminalWrite("OPENING // NOTES");
        openWindow(notesWindow);
        setTimeout(function () { notesEditor.focus(); }, 50);
    } else if (command === "open calculator") {
        terminalWrite("OPENING // CALCULATOR");
        openWindow(calculatorWindow);
        setTimeout(function () { calculatorWindow.focus(); }, 50);
    } else if (command === "open signal") {
        terminalWrite("OPENING // SIGNAL LOG");
        openWindow(signalLogWindow);
    } else if (command === "open customization") {
        terminalWrite("OPENING // CUSTOMIZATION");
        openWindow(customizationWindow);
    } else if (command === "open web") {
        terminalWrite("OPENING // PULSAR WEB");
        openWindow(webWindow);
        setTimeout(function () { webAddress.focus(); }, 50);
    } else if (command === "open serial") {
        terminalWrite("OPENING // SERIAL MONITOR");
        openWindow(serialWindow);
    } else if (command === "open devices") {
        terminalWrite("OPENING // DEVICE MANAGER");
        openWindow(deviceManagerWindow);
    } else if (command === "open guide") {
        terminalWrite("OPENING // PULSAR GUIDE");
        openWindow(guideWindow);
    } else {
        terminalWrite("COMMAND NOT FOUND // " + text);
    }

    terminalStatus.textContent = "READY";
}

terminalInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();

        const text = terminalInput.value;
        terminalInput.value = "";
        terminalWrite("pulsar@core:~$ " + text);

        if (text.trim() !== "") {
            oldCommands.push(text);
        }
        oldCommandIndex = oldCommands.length;

        runCommand(text);
    }

    // arrow up and down show the old commands
    if (event.key === "ArrowUp") {
        event.preventDefault();
        if (oldCommandIndex > 0) {
            oldCommandIndex = oldCommandIndex - 1;
        }
        terminalInput.value = oldCommands[oldCommandIndex] || "";
    }

    if (event.key === "ArrowDown") {
        event.preventDefault();
        if (oldCommandIndex < oldCommands.length) {
            oldCommandIndex = oldCommandIndex + 1;
        }
        terminalInput.value = oldCommands[oldCommandIndex] || "";
    }
});

const webHistory = [];
let webIndex = -1;
let webUrl = "";
let webTimer = null;

// no allow-same-origin on purpose, if not the sites inside the frame
// could read the notes from localStorage
webFrame.setAttribute("sandbox", "allow-forms allow-popups allow-scripts");

function updateNetwork() {
    let label = "NETWORK // OFFLINE";

    if (navigator.onLine) {
        label = "NETWORK // ONLINE";
        networkIndicator.classList.remove("offline");
    } else {
        networkIndicator.classList.add("offline");
    }

    networkIndicator.title = label;
    networkIndicator.setAttribute("aria-label", label);
    webFooterStatus.textContent = label;
}

window.addEventListener("online", updateNetwork);
window.addEventListener("offline", updateNetwork);
updateNetwork();

// view can be "home", "frame" or "fallback"
function showWebView(view) {
    webHomeScreen.hidden = view !== "home";
    webFrame.hidden = view !== "frame";
    webFallback.hidden = view !== "fallback";
}

function updateWebButtons() {
    webBack.disabled = webIndex <= 0;
    webForward.disabled = webIndex >= webHistory.length - 1;
    webReload.disabled = webUrl === "";
}

// google doesnt let other sites show it inside an iframe
function isBlockedSite(url) {
    const host = new URL(url).hostname.toLowerCase();
    return host === "google.com" || host.endsWith(".google.com");
}

function looksLikeUrl(text) { //HEADACHE BE CAREFUL HERE , PLEASE
    if (/^https?:\/\//i.test(text)) return true;
    if (/^localhost(:\d+)?([/?#]|$)/i.test(text)) return true;
    if (/^(\d{1,3}\.){3}\d{1,3}(:\d+)?([/?#]|$)/.test(text)) return true;
    return /^\S+\.[a-z]{2,}(:\d+)?([/?#].*)?$/i.test(text);
}

// returns the url to open, "home", or null if it is invalid
function getWebDestination(input) {
    const text = input.trim();

    if (text === "") {
        return null;
    }

    if (text.toLowerCase() === "home" || text.toLowerCase() === "pulsar://home") {
        return "home";
    }

    // not an address = search on google
    if (!looksLikeUrl(text)) {
        return "https://www.google.com/search?q=" + encodeURIComponent(text);
    }

    let url = text;

    if (!/^https?:\/\//i.test(url)) {
        // local addresses use http
        if (/^(localhost|127\.|192\.168\.|10\.)/i.test(url)) {
            url = "http://" + url;
        } else {
            url = "https://" + url;
        }
    }

    try {
        return new URL(url).href;
    } catch (error) {
        return null;
    }
}

function renderWebHistory() {
    webHistoryList.innerHTML = "";

    if (webHistory.length === 0) {
        webHistoryList.appendChild(makeElement("div", "web-history-empty", "NO NAVIGATION HISTORY"));
        return;
    }

    // newest first
    for (let i = webHistory.length - 1; i >= 0; i--) {
        const url = webHistory[i];
        const item = makeElement("button", "web-history-item");

        item.appendChild(makeElement("div", "web-history-item-title", new URL(url).hostname));
        item.appendChild(makeElement("div", "web-history-item-url", url));

        // "let i" in the for makes a new i for each button, so the click remembers the right one
        item.addEventListener("click", function () {
            webIndex = i;
            navigateWeb(url, false);
            webHistoryPanel.hidden = true;
        });

        webHistoryList.appendChild(item);
    }
}

function addWebHistory(url) {
    if (webHistory[webIndex] === url) {
        return;
    }

    // going to a new page removes the pages that were "forward"
    webHistory.splice(webIndex + 1);
    webHistory.push(url);
    webIndex = webHistory.length - 1;

    renderWebHistory();
}

function showWebHome() {
    clearTimeout(webTimer);

    webUrl = "";
    webAddress.value = "";
    webFrame.src = "about:blank"; // stops the old page

    showWebView("home");

    webStatus.textContent = "READY";
    webProtocol.textContent = "LOCAL // HOME";

    updateNetwork();
    updateWebButtons();
}

function showWebFallback(url) {
    clearTimeout(webTimer);

    showWebView("fallback");

    webFallbackUrl.textContent = url;
    webStatus.textContent = "EMBED // BLOCKED";
    webProtocol.textContent = "EXTERNAL // REQUIRED";
}

function navigateWeb(url, saveInHistory) {
    webUrl = url;
    webAddress.value = url;

    if (saveInHistory) {
        addWebHistory(url);
    }
    updateWebButtons();

    if (isBlockedSite(url)) {
        showWebFallback(url);
        return;
    }

    showWebView("frame");

    webStatus.textContent = "CONNECTING";
    webProtocol.textContent = new URL(url).protocol.replace(":", "").toUpperCase() + " // EMBEDDED";
    webFooterStatus.textContent = navigator.onLine ? "NETWORK // REQUESTING" : "NETWORK // OFFLINE";

    webFrame.src = url;

    // the browser doesnt tell us if the site blocked the iframe, so after 6s
    // we just show a hint about the ↗ button
    clearTimeout(webTimer);
    webTimer = setTimeout(function () {
        if (webUrl !== "") {
            webStatus.textContent = "CHECK VIEW // ↗ IF BLOCKED";
        }
    }, 6000);
}

function submitWebAddress() {
    const destination = getWebDestination(webAddress.value);

    if (destination === null) {
        webStatus.textContent = "INVALID ADDRESS";
    } else if (destination === "home") {
        showWebHome();
    } else {
        navigateWeb(destination, true);
    }
}

function openWebOutside() {
    if (webUrl !== "") {
        window.open(webUrl, "_blank", "noopener,noreferrer");
    }
}

webFrame.addEventListener("load", function () {
    if (webUrl === "") {
        return; // it was only the blank page from going home
    }
    clearTimeout(webTimer);
    webStatus.textContent = "FRAME // RESPONSE";
    updateNetwork();
});

webGo.addEventListener("click", submitWebAddress);

webAddress.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        submitWebAddress();
    }
});

webHome.addEventListener("click", showWebHome);

webBack.addEventListener("click", function () {
    if (webIndex > 0) {
        webIndex = webIndex - 1;
        navigateWeb(webHistory[webIndex], false);
    }
});

webForward.addEventListener("click", function () {
    if (webIndex < webHistory.length - 1) {
        webIndex = webIndex + 1;
        navigateWeb(webHistory[webIndex], false);
    }
});

webReload.addEventListener("click", function () {
    if (webUrl !== "") {
        navigateWeb(webUrl, false);
    }
});

webHistoryToggle.addEventListener("click", function () {
    webHistoryPanel.hidden = !webHistoryPanel.hidden;
});

webOpenExternal.addEventListener("click", openWebOutside);

// the ↗ button next to the history button (it is not in the html)
const externalButton = makeElement("button", "web-nav-button", "↗");
externalButton.type = "button";
externalButton.title = "Open externally";
externalButton.setAttribute("aria-label", "Open current page externally");
externalButton.addEventListener("click", openWebOutside);
webHistoryToggle.before(externalButton);

renderWebHistory();
showWebHome();

// no more boot screen, straight to PULSAR :D
allWindows.forEach(function (win) {
    closeWindow(win);
});

closeMenu();
openWindow(welcomeWindow);

//the end of the code :D, see? its not really that hard :D, just impossible^10 .