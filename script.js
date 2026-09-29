// ========================================
// PULSAR OS // BUILD 0.6
// ========================================

// ========================================
// ELEMENTS
// ========================================

const desktop = document.querySelector("#desktop");
const screenFade = document.querySelector("#screenFade");

// TOP BAR / MENU
const systemMenuButton = document.querySelector("#systemMenuButton");
const systemMenu = document.querySelector("#systemMenu");
const openAbout = document.querySelector("#openAbout");
const openSignalLog = document.querySelector("#openSignalLog");
const openCustomization = document.querySelector("#openCustomization");

// WELCOME / ABOUT
const welcomeWindow = document.querySelector("#welcome");
const welcomeHeader = document.querySelector("#welcomeheader");
const welcomeClose = document.querySelector("#welcomeclose");
const enterSystem = document.querySelector("#enterSystem");

// SIGNAL LOG
const signalLogWindow = document.querySelector("#signalLog");
const signalLogHeader = document.querySelector("#signalLogHeader");
const signalLogClose = document.querySelector("#signalLogClose");
const signalLogTitle = document.querySelector("#signalLogTitle");
const signalLogIcon = document.querySelector("#signalLogIcon");
const signalEntries = document.querySelector("#signalEntries");
const signalReader = document.querySelector("#signalReader");
const signalReaderStatus = document.querySelector("#signalReaderStatus");

// CUSTOMIZATION
const customizationWindow = document.querySelector("#customization");
const customizationHeader = document.querySelector("#customizationHeader");
const customizationClose = document.querySelector("#customizationClose");
const customizationIcon = document.querySelector("#customizationIcon");
const wallpaperCards = document.querySelectorAll(".wallpaper-card");
const wallpaperStatus = document.querySelector("#wallpaperStatus");
const customizationFooter = document.querySelector("#customizationFooter");

// ========================================
// CLOCK
// ========================================

function updateClock() {

    const now =
        new Date();

    const hours =
        String(now.getHours())
            .padStart(2, "0");

    const minutes =
        String(now.getMinutes())
            .padStart(2, "0");

    const seconds =
        String(now.getSeconds())
            .padStart(2, "0");

    const clock =
        document.querySelector("#clock");

    if (clock) {

        clock.textContent =
            `${hours}:${minutes}:${seconds}`;
    }
}

updateClock();

setInterval(
    updateClock,
    1000
);


// ========================================
// WINDOW MANAGER
// ========================================

let highestWindowIndex = 20;


function focusWindow(element) {

    if (!element) {
        return;
    }

    highestWindowIndex++;

    element.style.zIndex =
        highestWindowIndex;
}


function openWindow(element) {

    if (!element) {
        return;
    }

    element.classList.remove(
        "window-exit"
    );

    element.classList.remove(
        "hidden"
    );

    element.style.display =
        "flex";

    focusWindow(element);
}


function closeWindow(element) {

    if (!element) {
        return;
    }

    element.style.display =
        "none";
}


function animatedClose(element) {

    if (!element) {
        return;
    }

    element.classList.add(
        "window-exit"
    );

    setTimeout(
        function () {

            closeWindow(element);

            element.classList.remove(
                "window-exit"
            );

        },
        220
    );
}


// ========================================
// FOCUS WINDOWS
// ========================================

[
    welcomeWindow,
    signalLogWindow,
    customizationWindow

].forEach(
    function (windowElement) {

        if (!windowElement) {
            return;
        }

        windowElement.addEventListener(
            "pointerdown",
            function () {

                focusWindow(
                    windowElement
                );
            }
        );
    }
);


// ========================================
// GENERIC DRAG SYSTEM
// ========================================

function makeDraggable(
    windowElement,
    handleElement
) {

    if (
        !windowElement ||
        !handleElement
    ) {
        return;
    }

    let dragging = false;

    let pointerStartX = 0;
    let pointerStartY = 0;

    let windowStartX = 0;
    let windowStartY = 0;


    handleElement.addEventListener(
        "pointerdown",
        function (event) {

            if (
                event.target.closest(
                    ".window-controls"
                )
            ) {
                return;
            }

            event.preventDefault();

            dragging = true;

            focusWindow(
                windowElement
            );

            pointerStartX =
                event.clientX;

            pointerStartY =
                event.clientY;

            windowStartX =
                windowElement.offsetLeft;

            windowStartY =
                windowElement.offsetTop;

            handleElement.setPointerCapture(
                event.pointerId
            );
        }
    );


    handleElement.addEventListener(
        "pointermove",
        function (event) {

            if (!dragging) {
                return;
            }

            const deltaX =
                event.clientX -
                pointerStartX;

            const deltaY =
                event.clientY -
                pointerStartY;

            let newLeft =
                windowStartX +
                deltaX;

            let newTop =
                windowStartY +
                deltaY;

            const maxLeft =
                Math.max(
                    0,
                    desktop.clientWidth -
                    windowElement.offsetWidth
                );

            const maxTop =
                Math.max(
                    0,
                    desktop.clientHeight -
                    windowElement.offsetHeight
                );

            newLeft =
                Math.max(
                    0,
                    Math.min(
                        newLeft,
                        maxLeft
                    )
                );

            newTop =
                Math.max(
                    0,
                    Math.min(
                        newTop,
                        maxTop
                    )
                );

            windowElement.style.left =
                newLeft + "px";

            windowElement.style.top =
                newTop + "px";
        }
    );


    function stopDragging() {

        dragging = false;
    }


    handleElement.addEventListener(
        "pointerup",
        stopDragging
    );

    handleElement.addEventListener(
        "pointercancel",
        stopDragging
    );
}


// ACTIVATE DRAGGING

makeDraggable(
    welcomeWindow,
    welcomeHeader
);

makeDraggable(
    signalLogWindow,
    signalLogHeader
);

makeDraggable(
    customizationWindow,
    customizationHeader
);


// ========================================
// WELCOME / ABOUT WINDOW
// ========================================

if (welcomeClose) {

    welcomeClose.addEventListener(
        "click",
        function () {

            animatedClose(
                welcomeWindow
            );
        }
    );
}


if (enterSystem) {

    enterSystem.addEventListener(
        "click",
        function () {

            animatedClose(
                welcomeWindow
            );

            closeSystemMenu();

            deselectIcons();
        }
    );
}


// ========================================
// SYSTEM MENU
// ========================================

function openSystemMenuPanel() {

    if (
        !systemMenu ||
        !systemMenuButton
    ) {
        return;
    }

    systemMenu.classList.add(
        "open"
    );

    systemMenuButton.classList.add(
        "active"
    );
}


function closeSystemMenu() {

    if (
        !systemMenu ||
        !systemMenuButton
    ) {
        return;
    }

    systemMenu.classList.remove(
        "open"
    );

    systemMenuButton.classList.remove(
        "active"
    );
}


function toggleSystemMenu() {

    if (!systemMenu) {
        return;
    }

    if (
        systemMenu.classList.contains(
            "open"
        )
    ) {

        closeSystemMenu();

    } else {

        openSystemMenuPanel();
    }
}


if (systemMenuButton) {

    systemMenuButton.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

            toggleSystemMenu();
        }
    );
}


// ABOUT / WHAT'S NEW

if (openAbout) {

    openAbout.addEventListener(
        "click",
        function () {

            openWindow(
                welcomeWindow
            );

            closeSystemMenu();
        }
    );
}


// SIGNAL LOG

if (openSignalLog) {

    openSignalLog.addEventListener(
        "click",
        function () {

            openWindow(
                signalLogWindow
            );

            closeSystemMenu();

            deselectIcons();
        }
    );
}


// CUSTOMIZATION

if (openCustomization) {

    openCustomization.addEventListener(
        "click",
        function () {

            openWindow(
                customizationWindow
            );

            closeSystemMenu();

            deselectIcons();
        }
    );
}


// CLICK OUTSIDE MENU

document.addEventListener(
    "pointerdown",
    function (event) {

        if (
            !systemMenu ||
            !systemMenuButton
        ) {
            return;
        }

        const clickedMenu =
            systemMenu.contains(
                event.target
            );

        const clickedButton =
            systemMenuButton.contains(
                event.target
            );

        if (
            !clickedMenu &&
            !clickedButton
        ) {

            closeSystemMenu();
        }
    }
);


// ESC

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape"
        ) {

            closeSystemMenu();
        }
    }
);


// ========================================
// DESKTOP ICON MANAGER
// ========================================

let selectedIcon = null;


function selectIcon(element) {

    if (!element) {
        return;
    }

    if (
        selectedIcon &&
        selectedIcon !== element
    ) {

        selectedIcon.classList.remove(
            "selected"
        );
    }

    element.classList.add(
        "selected"
    );

    selectedIcon =
        element;
}


function deselectIcons() {

    if (!selectedIcon) {
        return;
    }

    selectedIcon.classList.remove(
        "selected"
    );

    selectedIcon = null;
}


function toggleIcon(element) {

    if (!element) {
        return;
    }

    if (
        element.classList.contains(
            "selected"
        )
    ) {

        deselectIcons();

    } else {

        selectIcon(
            element
        );
    }
}


// IMPORTANT:
// Desktop shortcuts were removed in BUILD 0.6.
// This function therefore safely ignores
// missing shortcut elements.

function bindDesktopApp(
    icon,
    windowElement
) {

    if (
        !icon ||
        !windowElement
    ) {
        return;
    }

    icon.addEventListener(
        "click",
        function () {

            toggleIcon(
                icon
            );
        }
    );


    icon.addEventListener(
        "dblclick",
        function () {

            openWindow(
                windowElement
            );

            deselectIcons();
        }
    );


    icon.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter"
            ) {

                openWindow(
                    windowElement
                );

                deselectIcons();
            }
        }
    );
}


// These calls are intentionally kept.
// If shortcuts are ever restored,
// they automatically work again.

bindDesktopApp(
    signalLogIcon,
    signalLogWindow
);

bindDesktopApp(
    customizationIcon,
    customizationWindow
);


// EMPTY DESKTOP

if (desktop) {

    desktop.addEventListener(
        "pointerdown",
        function (event) {

            const clickedApp =
                event.target.closest(
                    ".desktop-app"
                );

            const clickedWindow =
                event.target.closest(
                    ".window"
                );

            if (
                !clickedApp &&
                !clickedWindow
            ) {

                deselectIcons();
            }
        }
    );
}


// ========================================
// CLOSE BUTTONS
// ========================================

if (signalLogClose) {

    signalLogClose.addEventListener(
        "click",
        function () {

            animatedClose(
                signalLogWindow
            );
        }
    );
}


if (customizationClose) {

    customizationClose.addEventListener(
        "click",
        function () {

            animatedClose(
                customizationWindow
            );
        }
    );
}


// ========================================
// SIGNAL LOG DATABASE
// ========================================

const logs = [

    {
        code:
            "LOG // 001",

        title:
            "SYSTEM INIT",

        status:
            "TRANSMISSION // 001",

        content: `
            <h2>
                SYSTEM INIT
            </h2>

            <p>
                PULSAR CORE INITIALIZED.
            </p>

            <p>
                Desktop environment online.
                Window manager responding.
                Signal interface standing by.
            </p>

            <div class="signal-data">
                CORE ............ READY<br>
                DESKTOP ......... ONLINE<br>
                WINDOW MANAGER .. ONLINE<br>
                SIGNAL .......... STABLE
            </div>

            <p class="signal-muted">
                END OF TRANSMISSION // 001
            </p>
        `
    },


    {
        code:
            "LOG // 002",

        title:
            "PROJECT PULSAR",

        status:
            "TRANSMISSION // 002",

        content: `
            <h2>
                PROJECT PULSAR
            </h2>

            <p>
                PULSAR is a web-based operating
                system designed as an interface
                between a computer and external
                microcontrollers.
            </p>

            <p>
                The system combines a desktop
                environment with hardware tools,
                monitoring interfaces and
                communication utilities.
            </p>

            <div class="signal-data">
                PROJECT ......... PULSAR OS<br>
                PLATFORM ........ WEB<br>
                INTERFACE ....... HARDWARE<br>
                BUILD ........... 0.6
            </div>

            <p class="signal-muted">
                A STAR. A SIGNAL. AN INTERFACE.
            </p>
        `
    },


    {
        code:
            "LOG // 003",

        title:
            "HARDWARE INTERFACE",

        status:
            "TRANSMISSION // 003",

        content: `
            <h2>
                HARDWARE INTERFACE
            </h2>

            <p>
                Hardware communication services
                are currently standing by.
            </p>

            <p>
                Future builds will provide tools
                for connecting to supported
                microcontrollers and interacting
                with serial data.
            </p>

            <div class="signal-data">
                DEVICE .......... NONE<br>
                SERIAL .......... STANDBY<br>
                INTERFACE ....... READY<br>
                LINK ............ WAITING
            </div>

            <p class="signal-muted">
                AWAITING HARDWARE LINK.
            </p>
        `
    }

];


// ========================================
// CREATE SIGNAL LOG INDEX
// ========================================

function createSignalEntries() {

    if (!signalEntries) {
        return;
    }

    signalEntries.innerHTML =
        "";

    logs.forEach(
        function (log, index) {

            const entry =
                document.createElement(
                    "div"
                );

            entry.classList.add(
                "signal-entry"
            );

            entry.innerHTML = `
                <div class="signal-entry-title">
                    ${log.title}
                </div>

                <div class="signal-entry-code">
                    ${log.code}
                </div>
            `;

            entry.addEventListener(
                "click",
                function () {

                    displayLog(
                        index
                    );
                }
            );

            signalEntries.appendChild(
                entry
            );
        }
    );
}


// ========================================
// DISPLAY LOG
// ========================================

function displayLog(index) {

    const log =
        logs[index];

    if (!log) {
        return;
    }

    if (signalReader) {

        signalReader.innerHTML =
            log.content;
    }

    if (signalReaderStatus) {

        signalReaderStatus.textContent =
            log.status;
    }

    if (signalLogTitle) {

        signalLogTitle.textContent =
            `PULSAR // SIGNAL LOG // ${log.title}`;
    }

    const entries =
        document.querySelectorAll(
            ".signal-entry"
        );

    entries.forEach(
        function (entry) {

            entry.classList.remove(
                "active"
            );
        }
    );

    if (entries[index]) {

        entries[index].classList.add(
            "active"
        );
    }
}


createSignalEntries();


// ========================================
// WALLPAPER ENGINE
// ========================================

const wallpapers = {

    pulsar: {
        label:
            "PULSAR CORE",

        image:
            "images/Wallpapers/Pulsar-wllp.png"
    },

    galaxy: {
        label:
            "GALAXY",

        image:
            "images/Wallpapers/galaxy-wllp.png"
    },

    saturn: {
        label:
            "SATURN",

        image:
            "images/Wallpapers/saturn-wllp.png"
    },

    void: {
        label:
            "VOID",

        image:
            "images/Wallpapers/void-wllp.png"
    }

};


let wallpaperTransitionRunning =
    false;


// ========================================
// GET SAVED WALLPAPER
// ========================================

function getSavedWallpaper() {

    try {

        const saved =
            localStorage.getItem(
                "pulsar-wallpaper"
            );

        if (
            saved &&
            wallpapers[saved]
        ) {

            return saved;
        }

    } catch (error) {

        console.warn(
            "PULSAR // LOCAL STORAGE UNAVAILABLE",
            error
        );
    }

    return "pulsar";
}


// ========================================
// APPLY WALLPAPER
// ========================================

function applyWallpaper(
    name,
    persist = true
) {

    if (
        !wallpapers[name]
    ) {

        name =
            "pulsar";
    }

    const wallpaper =
        wallpapers[name];

    if (desktop) {

        desktop.style.setProperty(
            "--wallpaper-image",
            `url("${wallpaper.image}")`
        );
    }

    wallpaperCards.forEach(
        function (card) {

            const isActive =
                card.dataset.wallpaper ===
                name;

            card.classList.toggle(
                "active",
                isActive
            );
        }
    );

    if (wallpaperStatus) {

        wallpaperStatus.textContent =
            `ACTIVE // ${wallpaper.label}`;
    }

    if (customizationFooter) {

        customizationFooter.textContent =
            `WALLPAPER // ${wallpaper.label}`;
    }

    if (persist) {

        try {

            localStorage.setItem(
                "pulsar-wallpaper",
                name
            );

        } catch (error) {

            console.warn(
                "PULSAR // WALLPAPER COULD NOT BE SAVED",
                error
            );
        }
    }
}


// ========================================
// WALLPAPER TRANSITION
// ========================================

function setWallpaper(
    name,
    animate = true
) {

    if (
        !wallpapers[name]
    ) {
        return;
    }

    if (
        wallpaperTransitionRunning
    ) {
        return;
    }

    if (
        !animate ||
        !screenFade
    ) {

        applyWallpaper(
            name
        );

        return;
    }

    wallpaperTransitionRunning =
        true;

    screenFade.classList.add(
        "active"
    );

    setTimeout(
        function () {

            applyWallpaper(
                name
            );

            setTimeout(
                function () {

                    screenFade.classList.remove(
                        "active"
                    );

                    setTimeout(
                        function () {

                            wallpaperTransitionRunning =
                                false;
                        },
                        250
                    );

                },
                100
            );

        },
        220
    );
}


// ========================================
// WALLPAPER CARDS
// ========================================

wallpaperCards.forEach(
    function (card) {

        card.addEventListener(
            "click",
            function () {

                const wallpaper =
                    card.dataset.wallpaper;

                setWallpaper(
                    wallpaper,
                    true
                );
            }
        );
    }
);


// ========================================
// RESTORE WALLPAPER
// ========================================

applyWallpaper(
    getSavedWallpaper(),
    false
);


// ========================================
// PULSAR OS // BOOT MODULE
// BUILD 0.6
// ========================================

const pulsarBoot =
    document.querySelector(
        "#pulsarBoot"
    );

const pulsarBootBrand =
    document.querySelector(
        "#pulsarBootBrand"
    );

const pulsarBootTerminal =
    document.querySelector(
        "#pulsarBootTerminal"
    );

const pulsarBootLines =
    document.querySelector(
        "#pulsarBootLines"
    );

const pulsarBootCorner =
    document.querySelector(
        ".pulsar-boot-corner"
    );

const pulsarBootStatus =
    document.querySelector(
        "#pulsarBootStatus"
    );


// ========================================
// BOOT CONFIG
// ========================================

const PULSAR_BOOT_CONFIG = {

    build:
        "0.6",

    enabled:
        true,

    totalDuration:
        5000,

    brandDuration:
        900,

    lineDelay:
        105

};


// ========================================
// WAIT
// ========================================

function pulsarWait(
    milliseconds
) {

    return new Promise(
        function (resolve) {

            setTimeout(
                resolve,
                milliseconds
            );
        }
    );
}


// ========================================
// HARDWARE INFORMATION
// ========================================

function getPulsarHardwareInfo() {

    const logicalProcessors =
        navigator.hardwareConcurrency ||
        "UNKNOWN";

    const memory =
        navigator.deviceMemory

            ? `${navigator.deviceMemory} GB+`

            : "BROWSER RESTRICTED";

    let platform =
        "UNKNOWN";

    if (
        navigator.userAgentData &&
        navigator.userAgentData.platform
    ) {

        platform =
            navigator.userAgentData.platform;

    } else if (
        navigator.platform
    ) {

        platform =
            navigator.platform;
    }

    const display =
        `${window.screen.width}x${window.screen.height}`;

    const pixelRatio =
        window.devicePixelRatio

            ? window.devicePixelRatio
                .toFixed(2)

            : "1.00";

    const network =
        navigator.onLine

            ? "ONLINE"

            : "OFFLINE";

    const serial =
        "serial" in navigator

            ? "AVAILABLE"

            : "UNSUPPORTED";

    const usb =
        "usb" in navigator

            ? "AVAILABLE"

            : "UNSUPPORTED";

    let gamepad =
        "UNSUPPORTED";

    if (
        "getGamepads" in navigator
    ) {

        try {

            const connectedGamepads =
                Array.from(
                    navigator.getGamepads() ||
                    []
                ).filter(Boolean);

            gamepad =
                connectedGamepads.length > 0

                    ? `${connectedGamepads.length} CONNECTED`

                    : "NONE";

        } catch (error) {

            gamepad =
                "AVAILABLE";
        }
    }

    return {

        logicalProcessors,
        memory,
        platform,
        display,
        pixelRatio,
        network,
        serial,
        usb,
        gamepad

    };
}
// ========================================
// CREATE BOOT LINE
// ========================================

function createPulsarBootLine(
    type,
    text,
    important = false
) {

    if (!pulsarBootLines) {
        return;
    }

    const line =
        document.createElement(
            "div"
        );

    line.className =
        "pulsar-boot-line";

    if (important) {

        line.classList.add(
            "pulsar-boot-line-important"
        );
    }


    const prefix =
        document.createElement(
            "span"
        );

    prefix.className =
        `pulsar-boot-prefix ${type.toLowerCase()}`;


    switch (type) {

        case "OK":

            prefix.textContent =
                "[  OK  ]";

            break;


        case "WARN":

            prefix.textContent =
                "[ WARN ]";

            break;


        default:

            prefix.textContent =
                "[ INFO ]";

            break;
    }


    const message =
        document.createElement(
            "span"
        );

    message.className =
        "pulsar-boot-line-text";

    message.textContent =
        text;


    line.append(
        prefix,
        message
    );

    pulsarBootLines.appendChild(
        line
    );


    // Keep newest boot lines visible
    // on smaller displays.

    if (pulsarBootTerminal) {

        while (
            pulsarBootLines.scrollHeight >
                pulsarBootTerminal.clientHeight &&

            pulsarBootLines.children.length >
                1
        ) {

            pulsarBootLines.removeChild(
                pulsarBootLines
                    .firstElementChild
            );
        }
    }
}


// ========================================
// BOOT DATABASE
// ========================================

function createPulsarBootDatabase() {

    const hardware =
        getPulsarHardwareInfo();


    return [

        [
            "INFO",
            "PULSAR-OS boot sequence initiated"
        ],

        [
            "INFO",
            `Loading PULSAR core // BUILD ${PULSAR_BOOT_CONFIG.build}`
        ],

        [
            "OK",
            "pulsar-core.service"
        ],

        [
            "OK",
            "local-storage.service"
        ],

        [
            "INFO",
            `Platform ................ ${hardware.platform}`
        ],

        [
            "INFO",
            `Logical processors ...... ${hardware.logicalProcessors}`
        ],

        [
            "INFO",
            `Memory interface ........ ${hardware.memory}`
        ],

        [
            "INFO",
            `Display ................. ${hardware.display}`
        ],

        [
            "INFO",
            `Pixel ratio ............. ${hardware.pixelRatio}`
        ],

        [
            hardware.network ===
                "ONLINE"

                ? "OK"

                : "WARN",

            `Network interface ....... ${hardware.network}`
        ],

        [
            hardware.serial ===
                "AVAILABLE"

                ? "OK"

                : "WARN",

            `Web Serial .............. ${hardware.serial}`
        ],

        [
            hardware.usb ===
                "AVAILABLE"

                ? "OK"

                : "WARN",

            `Web USB ................. ${hardware.usb}`
        ],

        [
            hardware.gamepad !==
                "UNSUPPORTED"

                ? "OK"

                : "WARN",

            `Gamepad interface ....... ${hardware.gamepad}`
        ],

        [
            "INFO",
            "Loading desktop environment"
        ],

        [
            "OK",
            "window-manager.service"
        ],

        [
            "OK",
            "desktop-session.service"
        ],

        [
            "OK",
            "signal-log.service"
        ],

        [
            "OK",
            "customisation.service"
        ],

        [
            "OK",
            "wallpaper-engine.service"
        ],

        [
            "INFO",
            `Wallpaper ............... ${getSavedWallpaper().toUpperCase()}`
        ],

        [
            "INFO",
            "Restoring local user environment"
        ],

        [
            "OK",
            "PULSAR desktop session initialized"
        ],

        [
            "OK",
            "Reached target: pulsar-desktop.target",
            true
        ]

    ];
}


// ========================================
// PREPARE DESKTOP
// ========================================

function preparePulsarDesktop() {

    /*
        Welcome is no longer shown
        automatically during startup.

        It remains available through:
        PULSAR MENU -> SYSTEM / ABOUT

        Later this can become:
        WHAT'S NEW?
    */

    if (welcomeWindow) {

        welcomeWindow.style.display =
            "none";

        welcomeWindow.classList.add(
            "hidden"
        );
    }


    /*
        Applications begin closed.
        They are opened from the
        PULSAR system menu.
    */

    if (signalLogWindow) {

        signalLogWindow.style.display =
            "none";
    }


    if (customizationWindow) {

        customizationWindow.style.display =
            "none";
    }


    closeSystemMenu();

    deselectIcons();
}


// ========================================
// RUN BOOT TERMINAL
// ========================================

async function runPulsarTerminal() {

    const database =
        createPulsarBootDatabase();


    for (
        const entry
        of database
    ) {

        createPulsarBootLine(
            entry[0],
            entry[1],
            entry[2] || false
        );


        await pulsarWait(
            PULSAR_BOOT_CONFIG.lineDelay
        );
    }
}


// ========================================
// FINISH BOOT
// ========================================

async function finishPulsarBoot() {

    if (!pulsarBoot) {
        return;
    }


    /*
        Terminal and corner identity
        disappear first.
    */

    if (pulsarBootTerminal) {

        pulsarBootTerminal.classList.remove(
            "active"
        );
    }


    if (pulsarBootCorner) {

        pulsarBootCorner.classList.remove(
            "active"
        );
    }


    await pulsarWait(
        260
    );


    /*
        Fade the boot layer away.
    */

    pulsarBoot.classList.add(
        "boot-finished"
    );


    await pulsarWait(
        900
    );


    /*
        Remove boot overlay completely.

        Desktop is now fully interactive.
    */

    pulsarBoot.style.display =
        "none";

    pulsarBoot.style.pointerEvents =
        "none";
}


// ========================================
// BOOT WARNING
// ========================================

function pulsarBootWarning(
    message,
    error
) {

    console.warn(
        `PULSAR BOOT // ${message}`,
        error || ""
    );


    try {

        createPulsarBootLine(
            "WARN",
            message
        );

    } catch (bootLineError) {

        console.warn(
            "PULSAR BOOT // LOG FAILURE",
            bootLineError
        );
    }
}


// ========================================
// EMERGENCY DESKTOP RELEASE
// ========================================

function releasePulsarDesktop() {

    if (!pulsarBoot) {
        return;
    }


    pulsarBoot.style.display =
        "none";

    pulsarBoot.style.pointerEvents =
        "none";
}


// ========================================
// START BOOT
// ========================================

async function startPulsarBoot() {

    /*
        Prepare the existing desktop.

        IMPORTANT:
        Boot is only an overlay.
        Window Manager remains untouched.
    */

    preparePulsarDesktop();


    /*
        If boot HTML doesn't exist,
        release desktop normally.
    */

    if (!pulsarBoot) {

        console.warn(
            "PULSAR // BOOT LAYER NOT FOUND"
        );

        return;
    }


    /*
        DEVELOPMENT SWITCH

        Change:

        enabled: true

        to:

        enabled: false

        inside PULSAR_BOOT_CONFIG
        to skip boot during development.
    */

    if (
        !PULSAR_BOOT_CONFIG.enabled
    ) {

        releasePulsarDesktop();

        return;
    }


    const bootStartedAt =
        performance.now();


    try {

        // ========================================
        // STAGE 01
        // PULSAR IDENTITY
        // ========================================

        if (pulsarBootStatus) {

            pulsarBootStatus.textContent =
                "INITIALIZING SYSTEM";
        }


        await pulsarWait(
            PULSAR_BOOT_CONFIG.brandDuration
        );


        /*
            Logo / PULSAR-OS screen
            leaves before terminal begins.
        */

        if (pulsarBootBrand) {

            pulsarBootBrand.classList.add(
                "boot-brand-leaving"
            );
        }


        await pulsarWait(
            420
        );


        if (pulsarBootBrand) {

            pulsarBootBrand.style.display =
                "none";
        }


        // ========================================
        // STAGE 02
        // TERMINAL BOOT
        // ========================================

        if (pulsarBootTerminal) {

            pulsarBootTerminal.classList.add(
                "active"
            );
        }


        if (pulsarBootCorner) {

            pulsarBootCorner.classList.add(
                "active"
            );
        }


        /*
            Linux-style boot information.
        */

        try {

            await runPulsarTerminal();

        } catch (error) {

            pulsarBootWarning(
                "Hardware probe incomplete - continuing boot",
                error
            );
        }


        // ========================================
        // BOOT DURATION
        // ========================================

        const elapsed =
            performance.now() -
            bootStartedAt;


        const remaining =
            Math.max(
                350,
                PULSAR_BOOT_CONFIG.totalDuration -
                elapsed
            );


        await pulsarWait(
            remaining
        );


        // ========================================
        // STAGE 03
        // DESKTOP SESSION
        // ========================================

        await finishPulsarBoot();


        console.log(
            "PULSAR OS // BUILD 0.6 // READY"
        );


    } catch (error) {

        /*
            FAIL OPEN.

            Boot animation should NEVER
            prevent access to the OS.
        */

        console.error(
            "PULSAR BOOT // CRITICAL WARNING",
            error
        );


        releasePulsarDesktop();
    }
}


// ========================================
// NETWORK STATE
// ========================================

window.addEventListener(
    "online",
    function () {

        console.log(
            "PULSAR // NETWORK ONLINE"
        );
    }
);


window.addEventListener(
    "offline",
    function () {

        console.log(
            "PULSAR // NETWORK OFFLINE"
        );
    }
);


// ========================================
// WINDOW RESIZE SAFETY
// ========================================

window.addEventListener(
    "resize",
    function () {

        [
            welcomeWindow,
            signalLogWindow,
            customizationWindow

        ].forEach(
            function (windowElement) {

                if (!windowElement) {
                    return;
                }


                if (
                    windowElement.style.display ===
                    "none"
                ) {
                    return;
                }


                const maxLeft =
                    Math.max(
                        0,
                        desktop.clientWidth -
                        windowElement.offsetWidth
                    );


                const maxTop =
                    Math.max(
                        0,
                        desktop.clientHeight -
                        windowElement.offsetHeight
                    );


                if (
                    windowElement.offsetLeft >
                    maxLeft
                ) {

                    windowElement.style.left =
                        maxLeft + "px";
                }


                if (
                    windowElement.offsetTop >
                    maxTop
                ) {

                    windowElement.style.top =
                        maxTop + "px";
                }
            }
        );
    }
);


// ========================================
// PULSAR POWER ON
// ========================================

startPulsarBoot();
