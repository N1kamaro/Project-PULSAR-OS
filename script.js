// ============================================================
// PULSAR OS // BUILD 1.0
// Made by N1K
// ============================================================
//
// SOURCE MAP
// ------------------------------------------------------------
// [J1] STORAGE CORE
// [J2] ELEMENT REGISTRY / SYSTEM SHELL
// [J3] WINDOW MANAGER
// [J4] DESKTOP / SYSTEM APPLICATIONS
// [J5] NOTES / CALCULATOR
// [J6] TERMINAL CORE
// [J7] WEB NAVIGATOR
// [J8] SERIAL CORE / DEVICE PROTOCOL
// [J9] DEVICE MANAGER / BOOT / SYSTEM SERVICES
//
// Search "[Jx]" to navigate directly to a module.
// ============================================================


// ============================================================
// [J1] STORAGE CORE
// ============================================================

// ========================================
// PULSAR OS // STORAGE CORE
// BUILD 1.0
// ========================================


const PulsarStorage = (() => {
    const PREFIX = "pulsar.";
    const VERSION = "1.0";

    function createKey(key) {
        return PREFIX + key;
    }

    function set(key, value) {
        try {
            const data = {
                value: value,
                updatedAt: Date.now()
            };

            localStorage.setItem(
                createKey(key),
                JSON.stringify(data)
            );

            return true;
        } catch (error) {
            console.warn(
                "PULSAR STORAGE // WRITE FAILED",
                key,
                error
            );

            return false;
        }
    }

    function get(key, fallback = null) {
        try {
            const raw = localStorage.getItem(createKey(key));

            if (raw === null) {
                return fallback;
            }

            const data = JSON.parse(raw);

            if (
                data &&
                Object.prototype.hasOwnProperty.call(data, "value")
            ) {
                return data.value;
            }

            return fallback;
        } catch (error) {
            console.warn(
                "PULSAR STORAGE // READ FAILED",
                key,
                error
            );

            return fallback;
        }
    }

    function has(key) {
        try {
            return localStorage.getItem(createKey(key)) !== null;
        } catch (error) {
            return false;
        }
    }

    function remove(key) {
        try {
            localStorage.removeItem(createKey(key));
            return true;
        } catch (error) {
            console.warn(
                "PULSAR STORAGE // REMOVE FAILED",
                key,
                error
            );

            return false;
        }
    }

    function clear() {
        try {
            const keys = [];

            for (let index = 0; index < localStorage.length; index++) {
                const key = localStorage.key(index);

                if (key && key.startsWith(PREFIX)) {
                    keys.push(key);
                }
            }

            keys.forEach(key => localStorage.removeItem(key));
            return true;
        } catch (error) {
            console.warn(
                "PULSAR STORAGE // CLEAR FAILED",
                error
            );

            return false;
        }
    }

    function exportData() {
        const output = {};

        try {
            for (let index = 0; index < localStorage.length; index++) {
                const storageKey = localStorage.key(index);

                if (
                    !storageKey ||
                    !storageKey.startsWith(PREFIX)
                ) {
                    continue;
                }

                const pulsarKey = storageKey.slice(PREFIX.length);
                output[pulsarKey] = get(pulsarKey);
            }
        } catch (error) {
            console.warn(
                "PULSAR STORAGE // EXPORT FAILED",
                error
            );
        }

        return output;
    }

    function initialize() {
        if (!has("system.createdAt")) {
            set(
                "system.createdAt",
                new Date().toISOString()
            );
        }

        set(
            "system.lastBoot",
            new Date().toISOString()
        );

        set(
            "system.storageVersion",
            VERSION
        );

        console.log("PULSAR STORAGE // ONLINE");
    }

    return {
        set,
        get,
        has,
        remove,
        clear,
        export: exportData,
        initialize
    };
})();

PulsarStorage.initialize();

// ============================================================
// [J2] ELEMENT REGISTRY / SYSTEM SHELL
// ============================================================

// ========================================
// ELEMENTS
// ========================================

// SYSTEM MENU
const systemMenuButton =
    document.getElementById("systemMenuButton");

const systemMenu =
    document.getElementById("systemMenu");

const openAbout =
    document.getElementById("openAbout");

const openSignalLog =
    document.getElementById("openSignalLog");

const openCustomization =
    document.getElementById("openCustomization");

const openNotes =
    document.getElementById("openNotes");

// DESKTOP
const desktop =
    document.getElementById("desktop");

const topBar =
    document.getElementById("topBar");

const clock =
    document.getElementById("clock");

const screenFade =
    document.getElementById("screenFade");

const networkIndicator =
    document.getElementById("networkIndicator");

// WELCOME / ABOUT
const welcomeWindow =
    document.getElementById("welcome");

const enterSystem =
    document.getElementById("enterSystem");

// SIGNAL LOG
const signalLogWindow =
    document.getElementById("signalLog");

const signalLogTitle =
    document.getElementById("signalLogTitle");

const signalEntries =
    document.getElementById("signalEntries");

const signalReaderStatus =
    document.getElementById("signalReaderStatus");

const signalReader =
    document.getElementById("signalReader");

// CUSTOMIZATION
const customizationWindow =
    document.getElementById("customization");

const wallpaperStatus =
    document.getElementById("wallpaperStatus");

const customizationFooter =
    document.getElementById("customizationFooter");

const wallpaperCards =
    document.querySelectorAll(".wallpaper-card");

// NOTES
const notesWindow =
    document.getElementById("notesWindow");

const notesEditor =
    document.getElementById("notesEditor");

const notesStatus =
    document.getElementById("notesStatus");

const clearNotes =
    document.getElementById("clearNotes");    

// CALCULATOR
const openCalculator =
    document.getElementById("openCalculator");

const calculatorWindow =
    document.getElementById("calculatorWindow");

const calculatorExpression =
    document.getElementById("calculatorExpression");

const calculatorResult =
    document.getElementById("calculatorResult");

const calculatorStatus =
    document.getElementById("calculatorStatus");

const calculatorButtons =
    document.querySelectorAll(".calculator-button");

    // TERMINAL
const openTerminal =
    document.getElementById("openTerminal");

const terminalWindow =
    document.getElementById("terminalWindow");

const terminalOutput =
    document.getElementById("terminalOutput");

const terminalInput =
    document.getElementById("terminalInput");

const terminalStatus =
    document.getElementById("terminalStatus");

    // WEB NAVIGATOR
    // PULSAR WEB
const openWeb =
    document.getElementById("openWeb");

const webWindow =
    document.getElementById("webWindow");

const webBack =
    document.getElementById("webBack");

const webForward =
    document.getElementById("webForward");

const webReload =
    document.getElementById("webReload");

const webHome =
    document.getElementById("webHome");

const webAddress =
    document.getElementById("webAddress");

const webGo =
    document.getElementById("webGo");

const webHistoryToggle =
    document.getElementById("webHistoryToggle");

const webStatus =
    document.getElementById("webStatus");

const webProtocol =
    document.getElementById("webProtocol");

const webHistoryPanel =
    document.getElementById("webHistoryPanel");

const webHistoryList =
    document.getElementById("webHistoryList");

const webHomeScreen =
    document.getElementById("webHomeScreen");

const webFrame =
    document.getElementById("webFrame");

const webFallback =
    document.getElementById("webFallback");

const webFallbackUrl =
    document.getElementById("webFallbackUrl");

const webOpenExternal =
    document.getElementById("webOpenExternal");

const webFooterStatus =
    document.getElementById("webFooterStatus");

    // SERIAL MONITOR
const openSerial =
    document.getElementById("openSerial");

const serialMenuStatus =
    document.getElementById("serialMenuStatus");

const serialWindow =
    document.getElementById("serialWindow");

const serialPortName =
    document.getElementById("serialPortName");

const serialBaudRate =
    document.getElementById("serialBaudRate");

const serialState =
    document.getElementById("serialState");

const serialStateText =
    document.getElementById("serialStateText");

const serialSelectPort =
    document.getElementById("serialSelectPort");

const serialConnect =
    document.getElementById("serialConnect");

const serialDisconnect =
    document.getElementById("serialDisconnect");

const serialVendorId =
    document.getElementById("serialVendorId");

const serialProductId =
    document.getElementById("serialProductId");

const serialDeviceLabel =
    document.getElementById("serialDeviceLabel");

const serialInterfaceStatus =
    document.getElementById("serialInterfaceStatus");

const serialLineEnding =
    document.getElementById("serialLineEnding");

const serialAutoScroll =
    document.getElementById("serialAutoScroll");

const serialTimestamp =
    document.getElementById("serialTimestamp");

const serialHexView =
    document.getElementById("serialHexView");

const serialClear =
    document.getElementById("serialClear");

const serialOutput =
    document.getElementById("serialOutput");

const serialTxInput =
    document.getElementById("serialTxInput");

const serialSend =
    document.getElementById("serialSend");

const serialRxBytes =
    document.getElementById("serialRxBytes");

const serialTxBytes =
    document.getElementById("serialTxBytes");

const serialRxMessages =
    document.getElementById("serialRxMessages");

const serialTxMessages =
    document.getElementById("serialTxMessages");

const serialLinkStatus =
    document.getElementById("serialLinkStatus");

const serialCoreStatus =
    document.getElementById("serialCoreStatus");

    // DEVICE MANAGER
const openDeviceManager =
    document.getElementById(
        "openDeviceManager"
    );

const deviceManagerMenuStatus =
    document.getElementById(
        "deviceManagerMenuStatus"
    );

const deviceManagerWindow =
    document.getElementById(
        "deviceManagerWindow"
    );

const deviceManagerName =
    document.getElementById(
        "deviceManagerName"
    );

const deviceManagerState =
    document.getElementById(
        "deviceManagerState"
    );

const deviceManagerStateText =
    document.getElementById(
        "deviceManagerStateText"
    );

const deviceManagerVendorId =
    document.getElementById(
        "deviceManagerVendorId"
    );

const deviceManagerProductId =
    document.getElementById(
        "deviceManagerProductId"
    );

const deviceManagerInterface =
    document.getElementById(
        "deviceManagerInterface"
    );

const deviceManagerBaud =
    document.getElementById(
        "deviceManagerBaud"
    );

const deviceManagerAlias =
    document.getElementById(
        "deviceManagerAlias"
    );

const deviceManagerLastSeen =
    document.getElementById(
        "deviceManagerLastSeen"
    );

const deviceManagerSelect =
    document.getElementById(
        "deviceManagerSelect"
    );

const deviceManagerConnect =
    document.getElementById(
        "deviceManagerConnect"
    );

const deviceManagerDisconnect =
    document.getElementById(
        "deviceManagerDisconnect"
    );

const deviceManagerOpenSerial =
    document.getElementById(
        "deviceManagerOpenSerial"
    );

const deviceManagerLink =
    document.getElementById(
        "deviceManagerLink"
    );
// GUIDE
const openGuide =
    document.getElementById("openGuide");

const guideWindow =
    document.getElementById("guideWindow");

const guideNavButtons =
    document.querySelectorAll(".guide-nav");

const guidePages =
    document.querySelectorAll(".guide-page");

// ========================================
// CLOCK
// ========================================

function updateClock() {
    if (!clock) {
        return;
    }

    const now = new Date();

    const hours = String(
        now.getHours()
    ).padStart(2, "0");

    const minutes = String(
        now.getMinutes()
    ).padStart(2, "0");

    const seconds = String(
        now.getSeconds()
    ).padStart(2, "0");

    clock.textContent =
        `${hours}:${minutes}:${seconds}`;
}

updateClock();
setInterval(updateClock, 1000);

// ========================================
// SYSTEM MENU
// ========================================

function openSystemMenu() {
    if (!systemMenu || !systemMenuButton) {
        return;
    }

    systemMenu.classList.add("open");
    systemMenuButton.classList.add("active");
}

function closeSystemMenu() {
    if (!systemMenu || !systemMenuButton) {
        return;
    }

    systemMenu.classList.remove("open");
    systemMenuButton.classList.remove("active");
}

function toggleSystemMenu() {
    if (!systemMenu) {
        return;
    }

    if (systemMenu.classList.contains("open")) {
        closeSystemMenu();
    } else {
        openSystemMenu();
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

document.addEventListener(
    "pointerdown",
    function (event) {
        if (!systemMenu || !systemMenuButton) {
            return;
        }

        const clickedMenu =
            systemMenu.contains(event.target);

        const clickedButton =
            systemMenuButton.contains(event.target);

        if (
            !clickedMenu &&
            !clickedButton
        ) {
            closeSystemMenu();
        }
    }
);

document.addEventListener(
    "keydown",
    function (event) {
        if (event.key === "Escape") {
            closeSystemMenu();
        }
    }
);

// ============================================================
// [J3] WINDOW MANAGER
// ============================================================

// ========================================
// PULSAR OS // WINDOW MANAGER
// BUILD 1.0
// ========================================

let highestWindowIndex = 20;

const PulsarWindowManager = (() => {
    const states = new Map();

    function getId(element) {
        if (!element) {
            return null;
        }

        return (
            element.id ||
            element.dataset.windowId ||
            null
        );
    }

    function getState(element) {
        if (!element) {
            return null;
        }

        if (!states.has(element)) {
            states.set(element, {
                open: element.style.display !== "none",
                minimized: false,
                maximized: false,
                restoreRect: null
            });
        }

        return states.get(element);
    }

    function focus(element) {
        if (!element) {
            return;
        }

        const state = getState(element);

        if (
            state &&
            state.minimized
        ) {
            return;
        }

        highestWindowIndex++;
        element.style.zIndex = highestWindowIndex;
    }

    function open(element) {
        if (!element) {
            return;
        }

        const state = getState(element);

        element.classList.remove(
            "window-exit",
            "hidden",
            "window-minimized"
        );

        element.style.display = "flex";

        state.open = true;
        state.minimized = false;

        focus(element);
    }

    function close(element) {
        if (!element) {
            return;
        }

        const state = getState(element);

        element.style.display = "none";

        element.classList.remove(
            "window-minimized"
        );

        state.open = false;
        state.minimized = false;
    }

    function animatedClose(element) {
        if (!element) {
            return;
        }

        element.classList.add("window-exit");

        setTimeout(
            function () {
                close(element);

                element.classList.remove(
                    "window-exit"
                );
            },
            220
        );
    }

    function minimize(element) {
        if (!element) {
            return;
        }

        const state = getState(element);

        if (!state.open) {
            return;
        }

        state.minimized = true;

        element.classList.add(
            "window-minimized"
        );

        element.style.display = "none";

        console.log(
            `PULSAR WINDOW // ${getId(element)} // MINIMIZED`
        );
    }

    function saveRestoreRect(element) {
        const state = getState(element);
        const rect = element.getBoundingClientRect();

        state.restoreRect = {
            left: element.offsetLeft,
            top: element.offsetTop,
            width: rect.width,
            height: rect.height
        };
    }

    function maximize(element) {
        if (
            !element ||
            !desktop
        ) {
            return;
        }

        const state = getState(element);

        if (state.maximized) {
            restore(element);
            return;
        }

        saveRestoreRect(element);

        state.maximized = true;
        state.minimized = false;
        state.open = true;

        element.classList.add(
            "window-maximized"
        );

        element.style.display = "flex";
        element.style.left = "0px";
        element.style.top = "0px";

        element.style.width =
            desktop.clientWidth + "px";

        element.style.height =
            desktop.clientHeight + "px";

        element.style.maxWidth = "none";
        element.style.maxHeight = "none";

        focus(element);

        console.log(
            `PULSAR WINDOW // ${getId(element)} // MAXIMIZED`
        );
    }

    function restore(element) {
        if (!element) {
            return;
        }

        const state = getState(element);

        if (
            state.minimized &&
            !state.maximized
        ) {
            state.minimized = false;
            state.open = true;

            element.classList.remove(
                "window-minimized"
            );

            element.style.display = "flex";

            focus(element);
            return;
        }

        if (
            !state.maximized ||
            !state.restoreRect
        ) {
            open(element);
            return;
        }

        const rect = state.restoreRect;

        state.maximized = false;
        state.minimized = false;
        state.open = true;

        element.classList.remove(
            "window-maximized"
        );

        element.style.display = "flex";

        element.style.left =
            rect.left + "px";

        element.style.top =
            rect.top + "px";

        element.style.width =
            rect.width + "px";

        element.style.height =
            rect.height + "px";

        element.style.maxWidth = "";
        element.style.maxHeight = "";

        focus(element);

        console.log(
            `PULSAR WINDOW // ${getId(element)} // RESTORED`
        );
    }

    function toggleMaximize(element) {
        const state = getState(element);

        if (!state) {
            return;
        }

        if (state.maximized) {
            restore(element);
        } else {
            maximize(element);
        }
    }

    function isMaximized(element) {
        const state = getState(element);

        return Boolean(
            state &&
            state.maximized
        );
    }

    function getWindowState(element) {
        const state = getState(element);

        if (!state) {
            return null;
        }

        return {
            open: state.open,
            minimized: state.minimized,
            maximized: state.maximized
        };
    }

    return {
        open,
        close,
        focus,
        minimize,
        maximize,
        restore,
        toggleMaximize,
        animatedClose,
        isMaximized,
        getWindowState
    };
})();

// ========================================
// LEGACY COMPATIBILITY
// ========================================

function openWindow(element) {
    PulsarWindowManager.open(element);
}

function animatedClose(element) {
    PulsarWindowManager.animatedClose(element);
}

// ========================================
// GENERIC DRAG SYSTEM
// ========================================

function makeDraggable(
    windowElement,
    handleElement
) {
    if (
        !windowElement ||
        !handleElement ||
        !desktop
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

            if (
                PulsarWindowManager.isMaximized(
                    windowElement
                )
            ) {
                return;
            }

            event.preventDefault();

            dragging = true;

            PulsarWindowManager.focus(
                windowElement
            );

            pointerStartX = event.clientX;
            pointerStartY = event.clientY;

            windowStartX =
                windowElement.offsetLeft;

            windowStartY =
                windowElement.offsetTop;

            try {
                handleElement.setPointerCapture(
                    event.pointerId
                );
            } catch (error) {
                // Pointer capture is optional.
            }
        }
    );

    handleElement.addEventListener(
        "pointermove",
        function (event) {
            if (!dragging) {
                return;
            }

            const deltaX =
                event.clientX - pointerStartX;

            const deltaY =
                event.clientY - pointerStartY;

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

            const newLeft =
                Math.max(
                    0,
                    Math.min(
                        windowStartX + deltaX,
                        maxLeft
                    )
                );

            const newTop =
                Math.max(
                    0,
                    Math.min(
                        windowStartY + deltaY,
                        maxTop
                    )
                );

            windowElement.style.left =
                `${newLeft}px`;

            windowElement.style.top =
                `${newTop}px`;
        }
    );

    function stopDragging(event) {
        if (!dragging) {
            return;
        }

        dragging = false;

        try {
            if (
                handleElement.hasPointerCapture(
                    event.pointerId
                )
            ) {
                handleElement.releasePointerCapture(
                    event.pointerId
                );
            }
        } catch (error) {
            // Nothing to release.
        }
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

// ========================================
// PULSAR OS // WINDOW MANAGER AUTO REGISTER
// BUILD 1.0
// ========================================

function registerPulsarWindow(windowElement) {
    if (!windowElement) {
        return;
    }

    if (
        windowElement.dataset.windowRegistered ===
        "true"
    ) {
        return;
    }

    windowElement.dataset.windowRegistered =
        "true";

    const header =
        windowElement.querySelector(
            ".window-bar"
        );

    const minimizeButton =
        windowElement.querySelector(
            ".window-minimize"
        );

    const maximizeButton =
        windowElement.querySelector(
            ".window-maximize"
        );

    const closeButton =
        windowElement.querySelector(
            ".window-close"
        );

    // FOCUS
    windowElement.addEventListener(
        "pointerdown",
        function () {
            PulsarWindowManager.focus(
                windowElement
            );
        }
    );

    // DRAG + DOUBLE CLICK MAXIMIZE
    if (header) {
        makeDraggable(
            windowElement,
            header
        );

        header.addEventListener(
            "dblclick",
            function (event) {
                if (
                    event.target.closest(
                        ".window-controls"
                    )
                ) {
                    return;
                }

                PulsarWindowManager.toggleMaximize(
                    windowElement
                );
            }
        );
    }

    // MINIMIZE
    if (minimizeButton) {
        minimizeButton.addEventListener(
            "click",
            function (event) {
                event.stopPropagation();

                PulsarWindowManager.minimize(
                    windowElement
                );
            }
        );
    }

    // MAXIMIZE / RESTORE
    if (maximizeButton) {
        maximizeButton.addEventListener(
            "click",
            function (event) {
                event.stopPropagation();

                PulsarWindowManager.toggleMaximize(
                    windowElement
                );
            }
        );
    }

    // CLOSE
    if (closeButton) {
        closeButton.addEventListener(
            "click",
            function (event) {
                event.stopPropagation();

                PulsarWindowManager.animatedClose(
                    windowElement
                );
            }
        );
    }

    console.log(
        `PULSAR WINDOW // ${
            windowElement.id || "UNNAMED"
        } // REGISTERED`
    );
}

// ========================================
// REGISTER ALL WINDOWS
// ========================================

function registerPulsarWindows() {
    const windows =
        document.querySelectorAll(".window");

    windows.forEach(
        function (windowElement) {
            registerPulsarWindow(
                windowElement
            );
        }
    );

    console.log(
        `PULSAR WINDOW MANAGER // ${windows.length} WINDOWS REGISTERED`
    );
}

registerPulsarWindows();

// ============================================================
// [J4] DESKTOP / SYSTEM APPLICATIONS
// ============================================================

// ========================================
// WELCOME / ABOUT WINDOW
// ========================================

if (enterSystem) {
    enterSystem.addEventListener(
        "click",
        function () {
            animatedClose(welcomeWindow);
            closeSystemMenu();
            deselectIcons();
        }
    );
}

// ========================================
// SYSTEM MENU APPLICATIONS
// ========================================

// ABOUT / WHAT'S NEW
if (openAbout) {
    openAbout.addEventListener(
        "click",
        function () {
            openWindow(welcomeWindow);
            closeSystemMenu();
            deselectIcons();
        }
    );
}

// SIGNAL LOG
if (openSignalLog) {
    openSignalLog.addEventListener(
        "click",
        function () {
            openWindow(signalLogWindow);
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
            openWindow(customizationWindow);
            closeSystemMenu();
            deselectIcons();
        }
    );
}

// NOTES
if (openNotes) {
    openNotes.addEventListener(
        "click",
        function () {
            openWindow(notesWindow);
            closeSystemMenu();
            deselectIcons();

            setTimeout(
                function () {
                    if (notesEditor) {
                        notesEditor.focus();
                    }
                },
                50
            );
        }
    );
}

// CALCULATOR
if (
    openCalculator &&
    calculatorWindow
) {
    openCalculator.addEventListener(
        "click",
        function () {
            openWindow(
                calculatorWindow
            );

            closeSystemMenu();
            deselectIcons();

            calculatorWindow.focus();
        }
    );
}

 // TERMINAL
if (
    openTerminal &&
    terminalWindow
) {
    openTerminal.addEventListener(
        "click",
        function () {
            openWindow(
                terminalWindow
            );

            closeSystemMenu();
            deselectIcons();

            setTimeout(
                function () {
                    if (terminalInput) {
                        terminalInput.focus();
                    }
                },
                50
            );
        }
    );
}
// EU SOU O HANDLE, TO AQUI!!
// PULSAR WEB
if (
    openWeb &&
    webWindow
) {
    openWeb.addEventListener(
        "click",
        function () {
            openWindow(webWindow);
            closeSystemMenu();
            deselectIcons();

            setTimeout(
                function () {
                    if (webAddress) {
                        webAddress.focus();
                    }
                },
                50
            );
        }
    );
}

// SERIAL MONITOR
if (
    openSerial &&
    serialWindow
) {
    openSerial.addEventListener(
        "click",
        function () {
            openWindow(
                serialWindow
            );

            closeSystemMenu();
            deselectIcons();
        }
    );
}

// DEVICE MANAGER
if (
    openDeviceManager &&
    deviceManagerWindow
) {
    openDeviceManager.addEventListener(
        "click",
        function () {
            openWindow(
                deviceManagerWindow
            );

            closeSystemMenu();
            deselectIcons();
        }
    );
}

// GUIDE
if (
    openGuide &&
    guideWindow
) {
    openGuide.addEventListener(
        "click",
        function () {
            openWindow(guideWindow);
            closeSystemMenu();
            deselectIcons();
        }
    );
}

guideNavButtons.forEach(
    function (button) {
        button.addEventListener(
            "click",
            function () {
                const page =
                    button.dataset.guide;

                guideNavButtons.forEach(
                    item =>
                        item.classList.remove("active")
                );

                guidePages.forEach(
                    item =>
                        item.classList.remove("active")
                );

                button.classList.add("active");

                document
                    .querySelector(
                        `[data-guide-page="${page}"]`
                    )
                    ?.classList.add("active");
            }
        );
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

    element.classList.add("selected");
    selectedIcon = element;
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
        selectIcon(element);
    }
}

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
// SIGNAL LOG DATABASE
// ========================================

const logs = [
    {
        code: "LOG // 001",
        title: "SYSTEM INIT",
        status: "TRANSMISSION // 001",

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
        code: "LOG // 002",
        title: "PROJECT PULSAR",
        status: "TRANSMISSION // 002",

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
                BUILD ........... 1.0
            </div>

            <p class="signal-muted">
                A STAR. A SIGNAL. AN INTERFACE.
            </p>
        `
    },

        {
    code: "LOG // 003",
    title: "HARDWARE INTERFACE",
    status: "TRANSMISSION // 003",

    content: `
        <h2>
            HARDWARE INTERFACE
        </h2>

        <p>
            Hardware communication services
            are online.
        </p>

        <p>
            PULSAR can connect to supported
            microcontrollers through Web Serial,
            exchange serial data and manage
            connected devices.
        </p>

        <div class="signal-data">
            SERIAL .......... ONLINE<br>
            RX / TX .......... ENABLED<br>
            DEVICE MANAGER .. ONLINE<br>
            INTERFACE ....... WEB SERIAL<br>
            LINK ............ AVAILABLE
        </div>

        <p class="signal-muted">
            HARDWARE INTERFACE // READY.
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

    signalEntries.innerHTML = "";

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
                    displayLog(index);
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
    const log = logs[index];

    if (
        !log ||
        !signalReader
    ) {
        return;
    }

    signalReader.innerHTML =
        log.content;

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
// WALLPAPER DATABASE
// ========================================

const wallpapers = {
    pulsar: {
        className: "wallpaper-pulsar",
        label: "PULSAR CORE"
    },

    galaxy: {
        className: "wallpaper-galaxy",
        label: "GALAXY"
    },

    saturn: {
        className: "wallpaper-saturn",
        label: "SATURN"
    },

    void: {
        className: "wallpaper-void",
        label: "VOID"
    },

    grid: {
        className: "wallpaper-grid",
        label: "SIGNAL GRID"
    }
};

const wallpaperClasses =
    Object.values(
        wallpapers
    ).map(
        function (wallpaper) {
            return wallpaper.className;
        }
    );

// ========================================
// APPLY WALLPAPER
// ========================================

let wallpaperTransitionRunning =
    false;

function setWallpaper(
    name,
    animate = true
) {
    if (!wallpapers[name]) {
        return;
    }

    if (
        wallpaperTransitionRunning &&
        animate
    ) {
        return;
    }

    const applyWallpaper =
        function () {
            wallpaperClasses.forEach(
                function (className) {
                    desktop.classList.remove(
                        className
                    );
                }
            );

            desktop.classList.add(
                wallpapers[name].className
            );

            wallpaperCards.forEach(
                function (card) {
                    card.classList.toggle(
                        "active",
                        card.dataset.wallpaper ===
                            name
                    );
                }
            );

            if (wallpaperStatus) {
                wallpaperStatus.textContent =
                    `ACTIVE // ${wallpapers[name].label}`;
            }

            if (customizationFooter) {
                customizationFooter.textContent =
                    `WALLPAPER // ${wallpapers[name].label}`;
            }

            PulsarStorage.set(
                "system.wallpaper",
                name
            );
        };

    if (!animate) {
        applyWallpaper();
        return;
    }

    wallpaperTransitionRunning =
        true;

    if (screenFade) {
        screenFade.classList.add(
            "active"
        );
    }

    setTimeout(
        function () {
            applyWallpaper();

            setTimeout(
                function () {
                    if (screenFade) {
                        screenFade.classList.remove(
                            "active"
                        );
                    }

                    setTimeout(
                        function () {
                            wallpaperTransitionRunning =
                                false;
                        },
                        230
                    );
                },
                80
            );
        },
        220
    );
}

// ========================================
// WALLPAPER BUTTONS
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
// LOAD SAVED WALLPAPER
// ========================================

function loadWallpaper() {
    let savedWallpaper =
        PulsarStorage.get(
            "system.wallpaper",
            null
        );

    // MIGRATION FROM OLD STORAGE KEY
    if (!savedWallpaper) {
        try {
            const legacyWallpaper =
                localStorage.getItem(
                    "pulsar-wallpaper"
                );

            if (
                legacyWallpaper &&
                wallpapers[
                    legacyWallpaper
                ]
            ) {
                savedWallpaper =
                    legacyWallpaper;

                PulsarStorage.set(
                    "system.wallpaper",
                    legacyWallpaper
                );

                localStorage.removeItem(
                    "pulsar-wallpaper"
                );

                console.log(
                    "PULSAR STORAGE // LEGACY WALLPAPER MIGRATED"
                );
            }
        } catch (error) {
            console.warn(
                "PULSAR STORAGE // WALLPAPER MIGRATION FAILED",
                error
            );
        }
    }

    if (
        !savedWallpaper ||
        !wallpapers[
            savedWallpaper
        ]
    ) {
        savedWallpaper =
            "pulsar";
    }

    setWallpaper(
        savedWallpaper,
        false
    );
}

loadWallpaper();

// ============================================================
// [J5] NOTES / CALCULATOR
// ============================================================

// ========================================
// PULSAR OS // NOTES
// BUILD 1.0
// ========================================

const NOTES_STORAGE_KEY =
    "apps.notes.content";

let notesSaveTimer = null;

function loadNotes() {
    if (!notesEditor) {
        return;
    }

    notesEditor.value =
        PulsarStorage.get(
            NOTES_STORAGE_KEY,
            ""
        );

    if (notesStatus) {
        notesStatus.textContent =
            "READY";
    }
}

function saveNotes() {
    if (!notesEditor) {
        return;
    }

    PulsarStorage.set(
        NOTES_STORAGE_KEY,
        notesEditor.value
    );

    if (notesStatus) {
        notesStatus.textContent =
            "SAVED";
    }
}

function scheduleNotesSave() {
    if (notesStatus) {
        notesStatus.textContent =
            "EDITING";
    }

    clearTimeout(
        notesSaveTimer
    );

    notesSaveTimer =
        setTimeout(
            function () {
                saveNotes();
            },
            350
        );
}

if (notesEditor) {
    notesEditor.addEventListener(
        "input",
        scheduleNotesSave
    );
}

loadNotes();

if (clearNotes) {
    clearNotes.addEventListener(
        "click",
        function () {
            if (!notesEditor) {
                return;
            }

            notesEditor.value = "";

            saveNotes();

            notesEditor.focus();
        }
    );
}

// ========================================
// PULSAR OS // CALCULATOR
// BUILD 1.0
// ========================================

let calculatorCurrent = "0";
let calculatorStored = null;
let calculatorOperator = null;
let calculatorWaiting = false;

if (calculatorWindow) {
    calculatorWindow.tabIndex = -1;
}

function getCalculatorOperatorSymbol(operator) {
    const symbols = {
        "+": "+",
        "-": "−",
        "*": "×",
        "/": "÷"
    };

    return symbols[operator] || operator;
}

function setCalculatorStatus(status) {
    if (calculatorStatus) {
        calculatorStatus.textContent = status;
    }
}

function renderCalculator() {
    if (!calculatorResult || !calculatorExpression) {
        return;
    }

    calculatorResult.textContent =
        calculatorCurrent;

    if (
        calculatorStored !== null &&
        calculatorOperator
    ) {
        calculatorExpression.textContent =
            `${calculatorStored} ${getCalculatorOperatorSymbol(
                calculatorOperator
            )}`;
    } else {
        calculatorExpression.textContent = "";
    }
}

function inputCalculatorDigit(digit) {
    if (calculatorWaiting) {
        calculatorCurrent = digit;
        calculatorWaiting = false;
    } else if (calculatorCurrent === "0") {
        calculatorCurrent = digit;
    } else {
        calculatorCurrent += digit;
    }

    setCalculatorStatus("READY");
    renderCalculator();
}

function inputCalculatorDecimal() {
    if (calculatorWaiting) {
        calculatorCurrent = "0.";
        calculatorWaiting = false;
    } else if (!calculatorCurrent.includes(".")) {
        calculatorCurrent += ".";
    }

    setCalculatorStatus("READY");
    renderCalculator();
}

function calculateValues(
    first,
    second,
    operator
) {
    let result;

    switch (operator) {
        case "+":
            result = first + second;
            break;

        case "-":
            result = first - second;
            break;

        case "*":
            result = first * second;
            break;

        case "/":
            if (second === 0) {
                return null;
            }

            result = first / second;
            break;

        default:
            return second;
    }

    return Math.round(
        (result + Number.EPSILON) *
        1000000000000
    ) / 1000000000000;
}

function chooseCalculatorOperator(operator) {
    const inputValue =
        Number(calculatorCurrent);

    if (
        calculatorOperator &&
        calculatorWaiting
    ) {
        calculatorOperator = operator;
        renderCalculator();
        return;
    }

    if (calculatorStored === null) {
        calculatorStored = inputValue;
    } else if (calculatorOperator) {
        const result = calculateValues(
            calculatorStored,
            inputValue,
            calculatorOperator
        );

        if (result === null) {
            calculatorError();
            return;
        }

        calculatorCurrent = String(result);
        calculatorStored = result;
    }

    calculatorOperator = operator;
    calculatorWaiting = true;

    setCalculatorStatus("OPERATOR");
    renderCalculator();
}

function calculatorEquals() {
    if (
        calculatorStored === null ||
        !calculatorOperator
    ) {
        return;
    }

    const secondValue =
        Number(calculatorCurrent);

    const firstValue =
        calculatorStored;

    const operator =
        calculatorOperator;

    const result = calculateValues(
        firstValue,
        secondValue,
        operator
    );

    if (result === null) {
        calculatorError();
        return;
    }

    calculatorExpression.textContent =
        `${firstValue} ${getCalculatorOperatorSymbol(
            operator
        )} ${secondValue} =`;

    calculatorCurrent = String(result);
    calculatorStored = null;
    calculatorOperator = null;
    calculatorWaiting = true;

    calculatorResult.textContent =
        calculatorCurrent;

    setCalculatorStatus("SOLVED");
}

function clearCalculator() {
    calculatorCurrent = "0";
    calculatorStored = null;
    calculatorOperator = null;
    calculatorWaiting = false;

    setCalculatorStatus("READY");
    renderCalculator();
}

function calculatorBackspace() {
    if (calculatorWaiting) {
        return;
    }

    if (calculatorCurrent.length <= 1) {
        calculatorCurrent = "0";
    } else {
        calculatorCurrent =
            calculatorCurrent.slice(0, -1);
    }

    renderCalculator();
}

function calculatorError() {
    calculatorCurrent = "0";
    calculatorStored = null;
    calculatorOperator = null;
    calculatorWaiting = false;

    if (calculatorExpression) {
        calculatorExpression.textContent =
            "INVALID OPERATION";
    }

    if (calculatorResult) {
        calculatorResult.textContent =
            "ERROR";
    }

    setCalculatorStatus("ERROR");
}

function handleCalculatorInput(value) {
    if (/^[0-9]$/.test(value)) {
        inputCalculatorDigit(value);
        return;
    }

    if (value === ".") {
        inputCalculatorDecimal();
        return;
    }

    if (
        value === "+" ||
        value === "-" ||
        value === "*" ||
        value === "/"
    ) {
        chooseCalculatorOperator(value);
    }
}

calculatorButtons.forEach(
    function (button) {
        button.addEventListener(
            "click",
            function () {
                const value =
                    button.dataset.value;

                const action =
                    button.dataset.action;

                if (value !== undefined) {
                    handleCalculatorInput(value);
                }

                if (action === "clear") {
                    clearCalculator();
                }

                if (action === "backspace") {
                    calculatorBackspace();
                }

                if (action === "equals") {
                    calculatorEquals();
                }
            }
        );
    }
);

if (calculatorWindow) {
    calculatorWindow.addEventListener(
        "keydown",
        function (event) {
            const key = event.key;

            if (/^[0-9]$/.test(key)) {
                handleCalculatorInput(key);
                event.preventDefault();
                return;
            }

            if (key === "." || key === ",") {
                handleCalculatorInput(".");
                event.preventDefault();
                return;
            }

            if (
                key === "+" ||
                key === "-" ||
                key === "*" ||
                key === "/"
            ) {
                handleCalculatorInput(key);
                event.preventDefault();
                return;
            }

            if (
                key === "Enter" ||
                key === "="
            ) {
                calculatorEquals();
                event.preventDefault();
                return;
            }

            if (key === "Backspace") {
                calculatorBackspace();
                event.preventDefault();
                return;
            }

            if (
                key === "Escape" ||
                key.toLowerCase() === "c"
            ) {
                clearCalculator();
                event.preventDefault();
            }
        }
    );
}

renderCalculator();

// ============================================================
// [J6] TERMINAL CORE
// ============================================================

// ========================================
// PULSAR OS // TERMINAL
// BUILD 1.0
// ========================================

function terminalScrollToBottom() {
    if (!terminalOutput) {
        return;
    }

    terminalOutput.scrollTop =
        terminalOutput.scrollHeight;
}

function terminalWrite(
    text,
    className = ""
) {
    if (!terminalOutput) {
        return;
    }

    const line =
        document.createElement("div");

    line.className =
        "terminal-line";

    if (className) {
        line.classList.add(className);
    }

    line.textContent =
        text;

    terminalOutput.appendChild(line);

    terminalScrollToBottom();
}

function terminalSetStatus(status) {
    if (terminalStatus) {
        terminalStatus.textContent =
            status;
    }
}

function terminalClear() {
    if (!terminalOutput) {
        return;
    }

    terminalOutput.innerHTML = "";
}

function terminalSendDeviceCommand(command) {
    if (
        PulsarSerial.getState() !==
        "CONNECTED"
    ) {
        terminalWrite(
            "DEVICE // NOT CONNECTED"
        );

        terminalSetStatus("READY");
        return;
    }

    terminalSetStatus("TX");

    PulsarSerial.write(
        command + "\n"
    )
        .then(
    function (bytesSent) {
        serialTxByteCount +=
            bytesSent;

        serialTxMessageCount++;

        serialAppendLine(
            command,
            "tx"
        );

        updateSerialTxCounters();

        terminalWrite(
            `TX // ${command}`
        );

        terminalSetStatus(
            "READY"
        );
    }
)
        .catch(
            function (error) {
                terminalWrite(
                    `DEVICE ERROR // ${
                        error.message ||
                        "WRITE FAILED"
                    }`
                );

                terminalSetStatus(
                    "ERROR"
                );
            }
        );
}

function executeTerminalCommand(rawCommand) {
    const command =
        rawCommand.trim();

    const normalized =
        command.toLowerCase();

    if (!command) {
        return;
    }

    terminalSetStatus("EXEC");

    if (normalized === "open notes") {
    terminalWrite("OPENING // NOTES");

    openWindow(notesWindow);

    setTimeout(
        function () {
            if (notesEditor) {
                notesEditor.focus();
            }
        },
        50
    );

    terminalSetStatus("READY");
    return;
}

if (normalized === "open calculator") {
    terminalWrite("OPENING // CALCULATOR");

    openWindow(calculatorWindow);

    setTimeout(
        function () {
            calculatorWindow.focus();
        },
        50
    );

    terminalSetStatus("READY");
    return;
}

if (normalized === "open signal") {
    terminalWrite("OPENING // SIGNAL LOG");

    openWindow(signalLogWindow);

    terminalSetStatus("READY");
    return;
}

if (normalized === "open customization") {
    terminalWrite("OPENING // CUSTOMIZATION");

    openWindow(customizationWindow);

    terminalSetStatus("READY");
    return;
}

if (normalized === "open web") {
    terminalWrite("OPENING // PULSAR WEB");

    openWindow(webWindow);

    setTimeout(
        function () {
            if (webAddress) {
                webAddress.focus();
            }
        },
        50
    );

    terminalSetStatus("READY");
    return;
}

if (normalized === "open serial") {
    terminalWrite(
        "OPENING // SERIAL MONITOR"
    );

    openWindow(serialWindow);

    terminalSetStatus("READY");
    return;
}

if (normalized === "open devices") {
    terminalWrite(
        "OPENING // DEVICE MANAGER"
    );

    openWindow(
        deviceManagerWindow
    );

    terminalSetStatus("READY");
    return;
}

if (normalized === "open guide") {
    terminalWrite(
        "OPENING // PULSAR GUIDE"
    );

    openWindow(guideWindow);

    terminalSetStatus("READY");
    return;
}

if (normalized === "serial status") {
    const state =
        PulsarSerial.getState();

    const info =
        PulsarSerial.getInfo();

    terminalWrite(
        `SERIAL STATE .... ${state}`
    );

    terminalWrite(
        `BAUD ............ ${
            PulsarSerial.getBaudRate()
        }`
    );

    terminalWrite(
        `VID ............. ${
            info?.usbVendorId !== undefined
                ? formatSerialUsbId(
                    info.usbVendorId
                )
                : "UNKNOWN"
        }`
    );

    terminalWrite(
        `PID ............. ${
            info?.usbProductId !== undefined
                ? formatSerialUsbId(
                    info.usbProductId
                )
                : "UNKNOWN"
        }`
    );

    terminalWrite(
        `LINK ............ ${
            state === "CONNECTED"
                ? "ACTIVE"
                : "INACTIVE"
        }`
    );

    terminalSetStatus("READY");
    return;
}

if (normalized === "devices") {
    const port =
        PulsarSerial.getPort();

    if (!port) {
        terminalWrite(
            "NO DEVICE SELECTED"
        );

        terminalSetStatus("READY");
        return;
    }

    terminalWrite(
        "DEVICE // SERIAL DEVICE"
    );

    terminalWrite(
        `STATE .... ${
            PulsarSerial.getState()
        }`
    );

    if (
        deviceManagerAlias &&
        deviceManagerAlias.value.trim()
    ) {
        terminalWrite(
            `ALIAS .... ${
                deviceManagerAlias.value.trim()
            }`
        );
    }

    terminalSetStatus("READY");
    return;
}

/* DEVICE PROTOCOL */

if (normalized === "ping") {
    terminalSendDeviceCommand(
        "PING"
    );
    return;
}

if (normalized === "device info") {
    terminalSendDeviceCommand(
        "INFO"
    );
    return;
}

if (normalized === "device status") {
    terminalSendDeviceCommand(
        "STATUS"
    );
    return;
}

    switch (normalized) {
        case "help":

            terminalWrite(
            "open serial         // OPEN SERIAL MONITOR"
             );

            terminalWrite(
            "open devices        // OPEN DEVICE MANAGER"
             );


            terminalWrite(
            "serial status       // SERIAL LINK INFORMATION"
             );


            terminalWrite(
            "devices             // ACTIVE DEVICE"
            );

            terminalWrite(
            "ping                // TEST DEVICE LINK"
            );

            terminalWrite(
            "device info         // DEVICE INFORMATION"
            );

            terminalWrite(
            "device status       // DEVICE STATUS"
            );

            terminalWrite(
            "open web            // OPEN PULSAR WEB"
             );


            terminalWrite(
            "open notes          // OPEN NOTES"
            );

            terminalWrite(
            "open calculator     // OPEN CALCULATOR"
            );

            terminalWrite(
            "open signal         // OPEN SIGNAL LOG"
            );

            terminalWrite(
            "open customization  // OPEN CUSTOMIZATION"
            );

            terminalWrite(
                "AVAILABLE COMMANDS:"
            );

            terminalWrite(
                "help      // LIST COMMANDS"
            );

            terminalWrite(
                "clear     // CLEAR TERMINAL"
            );

            terminalWrite(
                "date      // SYSTEM DATE"
            );

            terminalWrite(
                "system    // PULSAR INFORMATION"
            );

            terminalWrite(
                "apps      // LIST APPLICATIONS"
            );

            terminalWrite(
                "open guide          // OPEN PULSAR GUIDE"
            );

            break;

        case "clear":
            terminalClear();
            break;

        case "date":
            terminalWrite(
                new Date().toString()
            );
            break;

        case "system":
            terminalWrite(
                "PULSAR OS // BUILD 1.0"
            );

            terminalWrite(
                "CORE ............ ONLINE"
            );

            terminalWrite(
                "WINDOW MANAGER .. ONLINE"
            );

            terminalWrite(
                "STORAGE ......... ONLINE"
            );

            terminalWrite(
                "SHELL ........... ONLINE"
            );
            terminalWrite(
    `SERIAL CORE ..... ${
        PulsarSerial.isSupported()
            ? "ONLINE"
            : "UNSUPPORTED"
    }`
);

terminalWrite(
    `HARDWARE LINK ... ${
        PulsarSerial.getState() ===
        "CONNECTED"
            ? "ACTIVE"
            : "STANDBY"
    }`
);
            break;

        case "apps":

            terminalWrite(
            "PULSAR WEB"
            );
            terminalWrite(
                "SIGNAL LOG"
            );

            terminalWrite(
                "NOTES"
            );

            terminalWrite(
                "CALCULATOR"
            );

            terminalWrite(
                "TERMINAL"
            );

            terminalWrite(
            "SERIAL MONITOR"
            );

            terminalWrite(
            "DEVICE MANAGER"
            );

            //GUIDE AQ

            break;

        default:
            terminalWrite(
                `COMMAND NOT FOUND // ${command}`
            );
            break;
    }

    terminalSetStatus("READY");
}

if (terminalInput) {
    terminalInput.addEventListener(
        "keydown",
        function (event) {
            if (event.key !== "Enter") {
                return;
            }

            event.preventDefault();

            const command =
                terminalInput.value;

            terminalWrite(
                `pulsar@core:~$ ${command}`
            );

            terminalInput.value = "";

            executeTerminalCommand(
                command
            );
        }
    );
}

// ============================================================
// [J7] WEB NAVIGATOR
// ============================================================

// ========================================
// PULSAR OS // WEB
// BUILD 1.0
// ========================================

const webNavigationHistory = [];
let webHistoryIndex = -1;
let webCurrentUrl = "";
let webLoadTimer = null;

const WEB_EMBED_BLOCKED_HOSTS = [
    "google.com",
    "www.google.com",
    "accounts.google.com"
];

function setWebStatus(status) {
    if (webStatus) {
        webStatus.textContent = status;
    }
}

function setWebProtocol(status) {
    if (webProtocol) {
        webProtocol.textContent = status;
    }
}

function setWebFooter(status) {
    if (webFooterStatus) {
        webFooterStatus.textContent = status;
    }
}

function updateWebNetworkStatus() {
    setWebFooter(
        navigator.onLine
            ? "NETWORK // ONLINE"
            : "NETWORK // OFFLINE"
    );
}

function hideWebViews() {
    if (webHomeScreen) {
        webHomeScreen.hidden = true;
    }

    if (webFrame) {
        webFrame.hidden = true;
    }

    if (webFallback) {
        webFallback.hidden = true;
    }
}

function showWebHome() {
    webCurrentUrl = "";

    if (webAddress) {
        webAddress.value = "";
    }

    hideWebViews();

    if (webHomeScreen) {
        webHomeScreen.hidden = false;
    }

    setWebStatus("READY");
    setWebProtocol("LOCAL // HOME");
    updateWebNetworkStatus();

    updateWebNavigationButtons();
}

function showWebFallback(url) {
    hideWebViews();

    if (webFallback) {
        webFallback.hidden = false;
    }

    if (webFallbackUrl) {
        webFallbackUrl.textContent =
            url || "NO URL";
    }

    setWebStatus("EMBED // BLOCKED");
    setWebProtocol("EXTERNAL // REQUIRED");
}

function webLooksLikeUrl(value) {
    if (
        /^https?:\/\//i.test(value)
    ) {
        return true;
    }

    if (
        /^localhost(?::\d+)?(?:\/|$)/i.test(value)
    ) {
        return true;
    }

    if (
        /^(?:\d{1,3}\.){3}\d{1,3}(?::\d+)?(?:\/|$)/.test(value)
    ) {
        return true;
    }

    return /^[^\s]+\.[a-z]{2,}(?::\d+)?(?:[/?#].*)?$/i.test(
        value
    );
}

function resolveWebInput(value) {
    const input =
        value.trim();

    if (!input) {
        return null;
    }

    if (
        input.toLowerCase() === "home" ||
        input.toLowerCase() === "pulsar://home"
    ) {
        return {
            type: "home"
        };
    }

    let url = input;

    if (!webLooksLikeUrl(input)) {
        url =
            "https://www.google.com/search?q=" +
            encodeURIComponent(input);

        return {
            type: "search",
            url
        };
    }

    if (
        !/^https?:\/\//i.test(url)
    ) {
        const localAddress =
            /^localhost/i.test(url) ||
            /^127\./.test(url) ||
            /^192\.168\./.test(url) ||
            /^10\./.test(url);

        url =
            (localAddress
                ? "http://"
                : "https://") +
            url;
    }

    try {
        const parsed =
            new URL(url);

        if (
            parsed.protocol !== "http:" &&
            parsed.protocol !== "https:"
        ) {
            return null;
        }

        return {
            type: "url",
            url: parsed.href
        };
    } catch (error) {
        return null;
    }
}

function addWebHistory(url) {
    if (!url) {
        return;
    }

    if (
        webHistoryIndex >= 0 &&
        webNavigationHistory[
            webHistoryIndex
        ] === url
    ) {
        return;
    }

    webNavigationHistory.splice(
        webHistoryIndex + 1
    );

    webNavigationHistory.push(url);

    webHistoryIndex =
        webNavigationHistory.length - 1;

    renderWebHistory();
}

function updateWebNavigationButtons() {
    if (webBack) {
        webBack.disabled =
            webHistoryIndex <= 0;
    }

    if (webForward) {
        webForward.disabled =
            webHistoryIndex < 0 ||
            webHistoryIndex >=
                webNavigationHistory.length - 1;
    }

    if (webReload) {
        webReload.disabled =
            !webCurrentUrl;
    }
}

function getWebHistoryLabel(url) {
    try {
        const parsed =
            new URL(url);

        return (
            parsed.hostname ||
            url
        );
    } catch (error) {
        return url;
    }
}

function renderWebHistory() {
    if (!webHistoryList) {
        return;
    }

    webHistoryList.innerHTML = "";

    if (
        webNavigationHistory.length === 0
    ) {
        const empty =
            document.createElement("div");

        empty.className =
            "web-history-empty";

        empty.textContent =
            "NO NAVIGATION HISTORY";

        webHistoryList.appendChild(
            empty
        );

        updateWebNavigationButtons();
        return;
    }

    webNavigationHistory
        .slice()
        .reverse()
        .forEach(
            function (url, reversedIndex) {
                const actualIndex =
                    webNavigationHistory.length -
                    1 -
                    reversedIndex;

                const button =
                    document.createElement(
                        "button"
                    );

                button.className =
                    "web-history-item";

                const title =
                    document.createElement(
                        "div"
                    );

                title.className =
                    "web-history-item-title";

                title.textContent =
                    getWebHistoryLabel(url);

                const address =
                    document.createElement(
                        "div"
                    );

                address.className =
                    "web-history-item-url";

                address.textContent =
                    url;

                button.append(
                    title,
                    address
                );

                button.addEventListener(
                    "click",
                    function () {
                        webHistoryIndex =
                            actualIndex;

                        navigateWeb(
                            url,
                            false
                        );

                        if (
                            webHistoryPanel
                        ) {
                            webHistoryPanel.hidden =
                                true;
                        }
                    }
                );

                webHistoryList.appendChild(
                    button
                );
            }
        );

    updateWebNavigationButtons();
}

function startWebLoadTimer() {
    if (webLoadTimer) {
        clearTimeout(webLoadTimer);
    }

    webLoadTimer =
        setTimeout(
            function () {
                if (!webCurrentUrl) {
                    return;
                }

                setWebStatus(
                    "CHECK VIEW // ↗ IF BLOCKED"
                );
            },
            6000
        );
}

function isKnownBlockedEmbed(url) {
    try {
        const parsed =
            new URL(url);

        return WEB_EMBED_BLOCKED_HOSTS.includes(
            parsed.hostname.toLowerCase()
        );
    } catch (error) {
        return false;
    }
}

function navigateWeb(
    url,
    addHistory = true
) {
    if (
        !url ||
        !webFrame
    ) {
        return;
    }

    webCurrentUrl =
        url;

    if (webAddress) {
        webAddress.value =
            url;
    }

    if (addHistory) {
        addWebHistory(url);
    }
    if (isKnownBlockedEmbed(url)) {
    showWebFallback(url);

    updateWebNavigationButtons();

    return;
}

    hideWebViews();

    webFrame.hidden = false;

    setWebStatus("CONNECTING");

    try {
        const parsed =
            new URL(url);

        setWebProtocol(
            `${parsed.protocol
                .replace(":", "")
                .toUpperCase()} // EMBEDDED`
        );
    } catch (error) {
        setWebProtocol(
            "WEB // EMBEDDED"
        );
    }

    setWebFooter(
        navigator.onLine
            ? "NETWORK // REQUESTING"
            : "NETWORK // OFFLINE"
    );

    webFrame.src = url;

    startWebLoadTimer();
    updateWebNavigationButtons();
}

function submitWebAddress() {
    if (!webAddress) {
        return;
    }

    const destination =
        resolveWebInput(
            webAddress.value
        );

    if (!destination) {
        setWebStatus(
            "INVALID ADDRESS"
        );

        return;
    }

    if (
        destination.type === "home"
    ) {
        showWebHome();
        return;
    }

    navigateWeb(
        destination.url
    );
}

function openWebExternal() {
    if (!webCurrentUrl) {
        return;
    }

    window.open(
        webCurrentUrl,
        "_blank",
        "noopener,noreferrer"
    );
}

if (webFrame) {
    webFrame.setAttribute(
        "sandbox",
        "allow-forms allow-popups allow-scripts"
    );

    webFrame.addEventListener(
        "load",
        function () {
            if (webLoadTimer) {
                clearTimeout(
                    webLoadTimer
                );
            }

            setWebStatus(
                "FRAME // RESPONSE"
            );

            updateWebNetworkStatus();
        }
    );

    webFrame.addEventListener(
        "error",
        function () {
            showWebFallback(
                webCurrentUrl
            );
        }
    );
}

if (webGo) {
    webGo.addEventListener(
        "click",
        submitWebAddress
    );
}

if (webAddress) {
    webAddress.addEventListener(
        "keydown",
        function (event) {
            if (
                event.key !== "Enter"
            ) {
                return;
            }

            event.preventDefault();
            submitWebAddress();
        }
    );
}

if (webHome) {
    webHome.addEventListener(
        "click",
        showWebHome
    );
}

if (webReload) {
    webReload.addEventListener(
        "click",
        function () {
            if (!webCurrentUrl) {
                return;
            }

            navigateWeb(
                webCurrentUrl,
                false
            );
        }
    );
}

if (webBack) {
    webBack.addEventListener(
        "click",
        function () {
            if (
                webHistoryIndex <= 0
            ) {
                return;
            }

            webHistoryIndex--;

            navigateWeb(
                webNavigationHistory[
                    webHistoryIndex
                ],
                false
            );
        }
    );
}

if (webForward) {
    webForward.addEventListener(
        "click",
        function () {
            if (
                webHistoryIndex >=
                webNavigationHistory.length -
                    1
            ) {
                return;
            }

            webHistoryIndex++;

            navigateWeb(
                webNavigationHistory[
                    webHistoryIndex
                ],
                false
            );
        }
    );
}

if (webHistoryToggle) {
    webHistoryToggle.addEventListener(
        "click",
        function () {
            if (!webHistoryPanel) {
                return;
            }

            webHistoryPanel.hidden =
                !webHistoryPanel.hidden;
        }
    );
}

if (webOpenExternal) {
    webOpenExternal.addEventListener(
        "click",
        openWebExternal
    );
}

// QUICK EXTERNAL BUTTON
if (
    webGo &&
    webHistoryToggle &&
    !document.getElementById(
        "webExternalQuick"
    )
) {
    const externalButton =
        document.createElement(
            "button"
        );

    externalButton.id =
        "webExternalQuick";

    externalButton.className =
        "web-nav-button";

    externalButton.type =
        "button";

    externalButton.title =
        "Open externally";

    externalButton.setAttribute(
        "aria-label",
        "Open current page externally"
    );

    externalButton.textContent =
        "↗";

    externalButton.addEventListener(
        "click",
        openWebExternal
    );

    webHistoryToggle.before(
        externalButton
    );
}

window.addEventListener(
    "online",
    updateWebNetworkStatus
);

window.addEventListener(
    "offline",
    updateWebNetworkStatus
);

renderWebHistory();
showWebHome();

// ============================================================
// [J8] SERIAL CORE / DEVICE PROTOCOL
// ============================================================

// ========================================
// PULSAR OS // SERIAL CORE
// BUILD 1.0
// ========================================

const PulsarSerial = (() => {
    let port = null;
    let reader = null;
    let writer = null;

    let state =
        "DISCONNECTED";

    let baudRate =
        115200;

    let keepReading =
        false;

    const decoder =
        new TextDecoder();

    const encoder =
        new TextEncoder();

    const stateListeners =
        new Set();

    const dataListeners =
        new Set();

    const errorListeners =
        new Set();

    function isSupported() {
        return (
            "serial" in navigator
        );
    }

    function getState() {
        return state;
    }

    function getPort() {
        return port;
    }

    function getBaudRate() {
        return baudRate;
    }

    function getInfo() {
        if (!port) {
            return null;
        }

        try {
            return port.getInfo();
        } catch (error) {
            return null;
        }
    }

    function emitState() {
        stateListeners.forEach(
            function (listener) {
                listener(state);
            }
        );
    }

    function setState(nextState) {
        state =
            nextState;

        emitState();

        console.log(
            `PULSAR SERIAL // ${state}`
        );
    }

    function emitData(data) {
        dataListeners.forEach(
            function (listener) {
                listener(data);
            }
        );
    }

    function emitError(error) {
        console.error(
            "PULSAR SERIAL // ERROR",
            error
        );

        errorListeners.forEach(
            function (listener) {
                listener(error);
            }
        );
    }

    function onStateChange(listener) {
        stateListeners.add(listener);

        return function () {
            stateListeners.delete(
                listener
            );
        };
    }

    function onData(listener) {
        dataListeners.add(listener);

        return function () {
            dataListeners.delete(
                listener
            );
        };
    }

    function onError(listener) {
        errorListeners.add(listener);

        return function () {
            errorListeners.delete(
                listener
            );
        };
    }

    async function requestPort() {
        if (!isSupported()) {
            setState(
                "UNSUPPORTED"
            );

            throw new Error(
                "WEB SERIAL UNSUPPORTED"
            );
        }

        setState(
            "REQUESTING"
        );

        try {
            port =
                await navigator.serial
                    .requestPort();

            setState(
                "DISCONNECTED"
            );

            return port;
        } catch (error) {
            if (
                error &&
                error.name ===
                    "NotFoundError"
            ) {
                setState(
                    "DISCONNECTED"
                );

                return null;
            }

            setState(
                "ERROR"
            );

            emitError(error);

            throw error;
        }
    }

    async function useAuthorizedPort() {
        if (!isSupported()) {
            return null;
        }

        try {
            const ports =
                await navigator.serial
                    .getPorts();

            if (
                ports.length === 0
            ) {
                return null;
            }

            port =
                ports[0];

            return port;
        } catch (error) {
            emitError(error);

            return null;
        }
    }

    async function connect(
        options = {}
    ) {
        if (!isSupported()) {
            setState(
                "UNSUPPORTED"
            );

            return false;
        }

        if (!port) {
            throw new Error(
                "NO SERIAL PORT SELECTED"
            );
        }

        if (
            state === "CONNECTED" ||
            state === "CONNECTING"
        ) {
            return true;
        }

        baudRate =
            Number(
                options.baudRate ||
                baudRate
            );

        setState(
            "CONNECTING"
        );

        try {
            await port.open({
                baudRate: baudRate,
                dataBits: 8,
                stopBits: 1,
                parity: "none",
                flowControl: "none"
            });

            writer =
                port.writable
                    ? port.writable.getWriter()
                    : null;

            keepReading =
                true;

            setState(
                "CONNECTED"
            );

            readLoop();

            return true;
        } catch (error) {
            setState(
                "ERROR"
            );

            emitError(error);

            return false;
        }
    }

    async function readLoop() {
        if (
            !port ||
            !port.readable
        ) {
            return;
        }

        try {
            reader =
                port.readable.getReader();

            while (
                keepReading &&
                state === "CONNECTED"
            ) {
                const {
                    value,
                    done
                } =
                    await reader.read();

                if (done) {
                    break;
                }

                if (
                    !value ||
                    value.length === 0
                ) {
                    continue;
                }

                const text =
                    decoder.decode(
                        value,
                        {
                            stream: true
                        }
                    );

                emitData({
                    bytes: value,
                    text: text
                });
            }
        } catch (error) {
            if (
                keepReading &&
                state === "CONNECTED"
            ) {
                emitError(error);
                setState("ERROR");
            }
        } finally {
            if (reader) {
                try {
                    reader.releaseLock();
                } catch (error) {
                    // Reader already released.
                }
            }

            reader = null;
        }
    }

    async function write(data) {
        if (
            state !== "CONNECTED" ||
            !writer
        ) {
            throw new Error(
                "SERIAL LINK NOT CONNECTED"
            );
        }

        const payload =
            typeof data === "string"
                ? encoder.encode(data)
                : data;

        try {
            await writer.write(
                payload
            );

            return payload.byteLength;
        } catch (error) {
            emitError(error);

            throw error;
        }
    }

    async function disconnect() {
    if (
        state === "DISCONNECTED"
    ) {
        return true;
    }

    setState(
        "DISCONNECTING"
    );

    keepReading =
        false;

    const activeReader =
        reader;

    if (activeReader) {
        try {
            await activeReader.cancel();
        } catch (error) {
            // Reader may already be closed.
        }

        try {
            activeReader.releaseLock();
        } catch (error) {
            // Reader lock may already be released.
        }

        if (reader === activeReader) {
            reader = null;
        }
    }

    if (writer) {
        try {
            writer.releaseLock();
        } catch (error) {
            // Writer may already be released.
        }

        writer = null;
    }

    if (port) {
        try {
            await port.close();
        } catch (error) {
            emitError(error);
        }
    }

    reader = null;

    setState(
        "DISCONNECTED"
    );

    return true;
}

    async function clearPort() {
        if (
            state === "CONNECTED"
        ) {
            await disconnect();
        }

        port = null;
    }

    return {
        isSupported,
        getState,
        getPort,
        getInfo,
        getBaudRate,
        requestPort,
        useAuthorizedPort,
        connect,
        disconnect,
        clearPort,
        write,
        onStateChange,
        onData,
        onError
    };
})();

// ========================================
// PULSAR DEVICE PROTOCOL // RX BRIDGE
// ========================================

let deviceProtocolBuffer = "";

PulsarSerial.onData(
    function (packet) {
        deviceProtocolBuffer +=
            packet.text;

        const lines =
            deviceProtocolBuffer.split(
                /\r?\n/
            );

        deviceProtocolBuffer =
            lines.pop() || "";

        lines.forEach(
            function (line) {
                if (
                    !line.startsWith(
                        "@PULSAR "
                    )
                ) {
                    return;
                }

                terminalWrite(
                    `DEVICE // ${
                        line.slice(8)
                    }`
                );
            }
        );
    }
);

// ========================================
// PULSAR OS // SERIAL UI BRIDGE
// ========================================

function formatSerialUsbId(value) {
    if (
        value === undefined ||
        value === null
    ) {
        return "UNKNOWN";
    }

    return (
        "0x" +
        Number(value)
            .toString(16)
            .toUpperCase()
            .padStart(4, "0")
    );
}

function updateSerialDeviceInfo() {
    const port =
        PulsarSerial.getPort();

    const info =
        PulsarSerial.getInfo();

    if (!port) {
        if (serialPortName) {
            serialPortName.textContent =
                "NO DEVICE";
        }

        if (serialVendorId) {
            serialVendorId.textContent =
                "UNKNOWN";
        }

        if (serialProductId) {
            serialProductId.textContent =
                "UNKNOWN";
        }

        if (serialDeviceLabel) {
            serialDeviceLabel.textContent =
                "NO DEVICE";
        }

        return;
    }

    if (serialPortName) {
        serialPortName.textContent =
            "SERIAL DEVICE";
    }

    if (serialVendorId) {
        serialVendorId.textContent =
            formatSerialUsbId(
                info?.usbVendorId
            );
    }

    if (serialProductId) {
        serialProductId.textContent =
            formatSerialUsbId(
                info?.usbProductId
            );
    }

    if (serialDeviceLabel) {
        serialDeviceLabel.textContent =
            "AUTHORIZED PORT";
    }
}

function updateSerialUiState(state) {
    const normalized =
        state.toLowerCase();

    if (serialState) {
        serialState.dataset.state =
            normalized;
    }

    if (serialStateText) {
        serialStateText.textContent =
            state;
    }

    if (serialMenuStatus) {
        serialMenuStatus.textContent =
            state === "CONNECTED"
                ? "ACTIVE"
                : "READY";
    }

    const hasPort =
        Boolean(
            PulsarSerial.getPort()
        );

    const connected =
        state === "CONNECTED";

    const busy =
        state === "REQUESTING" ||
        state === "CONNECTING" ||
        state === "DISCONNECTING";

    if (serialSelectPort) {
    serialSelectPort.disabled =
        busy ||
        connected ||
        state === "UNSUPPORTED";
    }

    if (serialConnect) {
        serialConnect.disabled =
            !hasPort ||
            busy ||
            connected ||
            state === "UNSUPPORTED";
    }

    if (serialDisconnect) {
        serialDisconnect.disabled =
            !connected;
    }

    if (serialBaudRate) {
        serialBaudRate.disabled =
            connected || busy;
    }

    if (serialTxInput) {
        serialTxInput.disabled =
            !connected;
    }

    if (serialSend) {
        serialSend.disabled =
            !connected;
    }

    if (serialLinkStatus) {
        serialLinkStatus.textContent =
            connected
                ? "ACTIVE"
                : "INACTIVE";
    }

    if (serialCoreStatus) {
        serialCoreStatus.textContent =
            state === "ERROR"
                ? "ERROR"
                : state === "UNSUPPORTED"
                    ? "UNSUPPORTED"
                    : "READY";
    }

    updateSerialDeviceInfo();
}

PulsarSerial.onStateChange(
    updateSerialUiState
);

PulsarSerial.onError(
    function (error) {
        console.error(
            "PULSAR SERIAL UI //",
            error
        );
    }
);

let serialRxByteCount = 0;
let serialRxMessageCount = 0;
let serialRxBuffer = "";
let serialHasReceivedData = false;

function getSerialTimestamp() {
    const now =
        new Date();

    return now.toLocaleTimeString(
        "en-GB",
        {
            hour12: false
        }
    );
}

function serialAppendLine(
    text,
    type = "rx"
) {
    if (!serialOutput) {
        return;
    }

    if (!serialHasReceivedData) {
        serialOutput.innerHTML = "";
        serialHasReceivedData = true;
    }

    const line =
        document.createElement(
            "div"
        );

    line.classList.add(
        "serial-line",
        `serial-${type}`
    );

    const showTimestamp =
        serialTimestamp?.value ===
        "on";

    const prefix =
        showTimestamp
            ? `[${getSerialTimestamp()}] `
            : "";

    line.textContent =
        `${prefix}${type.toUpperCase()} // ${text}`;

    serialOutput.appendChild(
        line
    );

    if (
        serialAutoScroll?.value ===
        "on"
    ) {
        serialOutput.scrollTop =
            serialOutput.scrollHeight;
    }
}

function updateSerialRxCounters() {
    if (serialRxBytes) {
        serialRxBytes.textContent =
            `${serialRxByteCount} B`;
    }

    if (serialRxMessages) {
        serialRxMessages.textContent =
            serialRxMessageCount;
    }
}

function bytesToHex(bytes) {
    return Array.from(bytes)
        .map(
            function (byte) {
                return byte
                    .toString(16)
                    .toUpperCase()
                    .padStart(2, "0");
            }
        )
        .join(" ");
}

PulsarSerial.onData(
    function (packet) {
        serialRxByteCount +=
            packet.bytes.byteLength;

        const hexEnabled =
            serialHexView?.value ===
            "on";

        if (hexEnabled) {
            serialRxMessageCount++;

            serialAppendLine(
                bytesToHex(
                    packet.bytes
                ),
                "rx"
            );

            updateSerialRxCounters();

            return;
        }

        serialRxBuffer +=
            packet.text;

        const lines =
            serialRxBuffer.split(
                /\r?\n/
            );

        serialRxBuffer =
            lines.pop() || "";

        lines.forEach(
            function (line) {
                serialRxMessageCount++;

                serialAppendLine(
                    line,
                    "rx"
                );
            }
        );

        updateSerialRxCounters();
    }
);

if (serialClear) {
    serialClear.addEventListener(
        "click",
        function () {
            if (serialOutput) {
                serialOutput.innerHTML = "";
            }

            serialRxByteCount = 0;
            serialRxMessageCount = 0;
            serialRxBuffer = "";

            serialTxByteCount = 0;
            serialTxMessageCount = 0;

            serialHasReceivedData = true;

            updateSerialRxCounters();
            updateSerialTxCounters();
        }
    );
}
let serialTxByteCount = 0;
let serialTxMessageCount = 0;

function getSerialLineEnding() {
    const mode =
        serialLineEnding?.value ||
        "none";

    switch (mode) {
        case "lf":
            return "\n";

        case "crlf":
            return "\r\n";

        default:
            return "";
    }
}

function updateSerialTxCounters() {
    if (serialTxBytes) {
        serialTxBytes.textContent =
            `${serialTxByteCount} B`;
    }

    if (serialTxMessages) {
        serialTxMessages.textContent =
            serialTxMessageCount;
    }
}

async function sendSerialData() {
    if (
        PulsarSerial.getState() !==
        "CONNECTED"
    ) {
        return;
    }

    if (!serialTxInput) {
        return;
    }

    const text =
        serialTxInput.value;

    if (!text) {
        return;
    }

    const payload =
        text +
        getSerialLineEnding();

    try {
        const bytesSent =
            await PulsarSerial.write(
                payload
            );

        serialTxByteCount +=
            bytesSent;

        serialTxMessageCount++;

        serialAppendLine(
            text,
            "tx"
        );

        updateSerialTxCounters();

        serialTxInput.value = "";
        serialTxInput.focus();
    } catch (error) {
        serialAppendLine(
            `SEND FAILED // ${
                error.message ||
                "UNKNOWN ERROR"
            }`,
            "error"
        );
    }
}

if (serialSend) {
    serialSend.addEventListener(
        "click",
        sendSerialData
    );
}

if (serialTxInput) {
    serialTxInput.addEventListener(
        "keydown",
        function (event) {
            if (
                event.key !== "Enter"
            ) {
                return;
            }

            event.preventDefault();

            sendSerialData();
        }
    );
}

// ========================================
// SERIAL SETTINGS // STORAGE
// ========================================

const SERIAL_SETTINGS_KEY =
    "hardware.serial.settings";

function saveSerialSettings() {
    PulsarStorage.set(
        SERIAL_SETTINGS_KEY,
        {
            baudRate:
                serialBaudRate?.value ||
                "115200",

            lineEnding:
                serialLineEnding?.value ||
                "crlf",

            autoScroll:
                serialAutoScroll?.value ||
                "on",

            timestamp:
                serialTimestamp?.value ||
                "on",

            hexView:
                serialHexView?.value ||
                "off"
        }
    );
}

function loadSerialSettings() {
    const settings =
        PulsarStorage.get(
            SERIAL_SETTINGS_KEY,
            null
        );

    if (!settings) {
        return;
    }

    if (
        serialBaudRate &&
        settings.baudRate
    ) {
        serialBaudRate.value =
            settings.baudRate;
    }

    if (
        serialLineEnding &&
        settings.lineEnding
    ) {
        serialLineEnding.value =
            settings.lineEnding;
    }

    if (
        serialAutoScroll &&
        settings.autoScroll
    ) {
        serialAutoScroll.value =
            settings.autoScroll;
    }

    if (
        serialTimestamp &&
        settings.timestamp
    ) {
        serialTimestamp.value =
            settings.timestamp;
    }

    if (
        serialHexView &&
        settings.hexView
    ) {
        serialHexView.value =
            settings.hexView;
    }
}

[
    serialBaudRate,
    serialLineEnding,
    serialAutoScroll,
    serialTimestamp,
    serialHexView
].forEach(
    function (control) {
        if (!control) {
            return;
        }

        control.addEventListener(
            "change",
            saveSerialSettings
        );
    }
);

loadSerialSettings();

if (serialSelectPort) {
    serialSelectPort.addEventListener(
        "click",
        async function () {
            try {
                await PulsarSerial.requestPort();

                updateSerialDeviceInfo();

                updateSerialUiState(
                    PulsarSerial.getState()
                );
            } catch (error) {
                console.error(
                    "PULSAR SERIAL // PORT REQUEST FAILED",
                    error
                );
            }
        }
    );
}

if (serialConnect) {
    serialConnect.addEventListener(
        "click",
        async function () {
            const baudRate =
                Number(
                    serialBaudRate?.value ||
                    115200
                );

            await PulsarSerial.connect({
                baudRate
            });
        }
    );
}

if (serialDisconnect) {
    serialDisconnect.addEventListener(
        "click",
        async function () {
            await PulsarSerial.disconnect();
        }
    );
}

if (!PulsarSerial.isSupported()) {
    updateSerialUiState(
        "UNSUPPORTED"
    );

    if (serialInterfaceStatus) {
        serialInterfaceStatus.textContent =
            "UNSUPPORTED";
    }
} else {
    updateSerialUiState(
        "DISCONNECTED"
    );
}

// ========================================
// DEVICE MANAGER // DEVICE MEMORY
// ========================================

function getDeviceManagerStorageKey() {
    const info =
        PulsarSerial.getInfo();

    if (
        info?.usbVendorId === undefined ||
        info?.usbProductId === undefined
    ) {
        return null;
    }

    const vendor =
        info.usbVendorId
            .toString(16)
            .toUpperCase();

    const product =
        info.usbProductId
            .toString(16)
            .toUpperCase();

    return `hardware.devices.${vendor}-${product}.alias`;
}

function loadDeviceManagerAlias() {
    if (!deviceManagerAlias) {
        return;
    }

    const key =
        getDeviceManagerStorageKey();

    if (!key) {
        deviceManagerAlias.value = "";
        deviceManagerAlias.disabled = true;
        return;
    }

    deviceManagerAlias.disabled = false;

    deviceManagerAlias.value =
        PulsarStorage.get(
            key,
            ""
        );
}

function saveDeviceManagerAlias() {
    if (!deviceManagerAlias) {
        return;
    }

    const key =
        getDeviceManagerStorageKey();

    if (!key) {
        return;
    }

    const alias =
        deviceManagerAlias.value.trim();

    if (!alias) {
        PulsarStorage.remove(key);
        return;
    }

    PulsarStorage.set(
        key,
        alias
    );
}

if (deviceManagerAlias) {
    deviceManagerAlias.addEventListener(
        "input",
        saveDeviceManagerAlias
    );
}

// ============================================================
// [J9] DEVICE MANAGER / BOOT / SYSTEM SERVICES
// ============================================================

// ======================================== 
// PULSAR OS // DEVICE MANAGER BRIDGE
// ========================================

function updateDeviceManagerUi(
    state = PulsarSerial.getState()
) {
    const port =
        PulsarSerial.getPort();

    const info =
        PulsarSerial.getInfo();

    const connected =
        state === "CONNECTED";

    const busy =
        state === "REQUESTING" ||
        state === "CONNECTING" ||
        state === "DISCONNECTING";

    const hasPort =
        Boolean(port);

    // DEVICE NAME
    if (deviceManagerName) {
        deviceManagerName.textContent =
            hasPort
                ? "SERIAL DEVICE"
                : "NO DEVICE";
    }

    // STATE
    if (deviceManagerStateText) {
        deviceManagerStateText.textContent =
            state;
    }

    if (deviceManagerState) {
        deviceManagerState.classList.toggle(
            "connected",
            connected
        );

        deviceManagerState.classList.toggle(
            "error",
            state === "ERROR"
        );
    }

    // USB INFORMATION
    if (deviceManagerVendorId) {
        deviceManagerVendorId.textContent =
            info?.usbVendorId !== undefined
                ? formatSerialUsbId(
                    info.usbVendorId
                )
                : "UNKNOWN";
    }

    if (deviceManagerProductId) {
        deviceManagerProductId.textContent =
            info?.usbProductId !== undefined
                ? formatSerialUsbId(
                    info.usbProductId
                )
                : "UNKNOWN";
    }

    // BAUD
    if (deviceManagerBaud) {
        deviceManagerBaud.textContent =
            serialBaudRate?.value ||
            PulsarSerial.getBaudRate() ||
            "115200";
    }

    // LINK
    if (deviceManagerLink) {
        deviceManagerLink.textContent =
            connected
                ? "LINK // ACTIVE"
                : "LINK // INACTIVE";
    }

    // MENU STATUS
    if (deviceManagerMenuStatus) {
        deviceManagerMenuStatus.textContent =
            connected
                ? "CONNECTED"
                : hasPort
                    ? "READY"
                    : "READY";
    }

    // BUTTON STATES
    if (deviceManagerSelect) {
        deviceManagerSelect.disabled =
            busy ||
            connected ||
            state === "UNSUPPORTED";
    }

    if (deviceManagerConnect) {
        deviceManagerConnect.disabled =
            !hasPort ||
            busy ||
            connected ||
            state === "UNSUPPORTED";
    }

    if (deviceManagerDisconnect) {
        deviceManagerDisconnect.disabled =
            !connected;
    }

    // LAST SEEN
        if (
        connected &&
        deviceManagerLastSeen
    ) {
        deviceManagerLastSeen.textContent =
            new Date().toLocaleTimeString(
                "en-GB",
                {
                    hour12: false
                }
            );
    }

    loadDeviceManagerAlias();
}

PulsarSerial.onStateChange(
    updateDeviceManagerUi
);

if (deviceManagerSelect) {
    deviceManagerSelect.addEventListener(
        "click",
        async function () {
            try {
                await PulsarSerial.requestPort();

                updateSerialDeviceInfo();

                updateSerialUiState(
                    PulsarSerial.getState()
                );

                updateDeviceManagerUi();
            } catch (error) {
                console.error(
                    "PULSAR DEVICE MANAGER // SELECT FAILED",
                    error
                );
            }
        }
    );
}

if (deviceManagerConnect) {
    deviceManagerConnect.addEventListener(
        "click",
        async function () {
            try {
                const baudRate =
                    Number(
                        serialBaudRate?.value ||
                        115200
                    );

                await PulsarSerial.connect({
                    baudRate
                });

                updateSerialDeviceInfo();
                updateDeviceManagerUi();
            } catch (error) {
                console.error(
                    "PULSAR DEVICE MANAGER // CONNECT FAILED",
                    error
                );
            }
        }
    );
}

if (deviceManagerDisconnect) {
    deviceManagerDisconnect.addEventListener(
        "click",
        async function () {
            try {
                await PulsarSerial.disconnect();

                updateSerialDeviceInfo();
                updateDeviceManagerUi();
            } catch (error) {
                console.error(
                    "PULSAR DEVICE MANAGER // DISCONNECT FAILED",
                    error
                );
            }
        }
    );
}

if (deviceManagerOpenSerial) {
    deviceManagerOpenSerial.addEventListener(
        "click",
        function () {
            openWindow(
                serialWindow
            );

            setTimeout(
    function () {
        PulsarWindowManager.focus(
            serialWindow
        );
    },
    20
);
}
);
}

updateDeviceManagerUi();

// ========================================
// PULSAR OS // BOOT MODULE
// BUILD 1.0
// ========================================

const pulsarBoot =
    document.querySelector("#pulsarBoot");

const pulsarBootBrand =
    document.querySelector("#pulsarBootBrand");

const pulsarBootTerminal =
    document.querySelector("#pulsarBootTerminal");

const pulsarBootLines =
    document.querySelector("#pulsarBootLines");

const pulsarBootCorner =
    document.querySelector(".pulsar-boot-corner");

const pulsarBootStatus =
    document.querySelector("#pulsarBootStatus");

// ========================================
// BOOT CONFIG
// ========================================

const PULSAR_BOOT_CONFIG = {
    build: "1.0",
    enabled: true,
    totalDuration: 5000,
    brandDuration: 900,
    lineDelay: 105
};

// ========================================
// WAIT
// ========================================

function pulsarWait(milliseconds) {
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
            ? window.devicePixelRatio.toFixed(2)
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

    if ("getGamepads" in navigator) {
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
        document.createElement("div");

    line.className =
        "pulsar-boot-line";

    if (important) {
        line.classList.add(
            "pulsar-boot-line-important"
        );
    }

    const prefix =
        document.createElement("span");

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
        document.createElement("span");

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

    if (pulsarBootTerminal) {
        while (
            pulsarBootLines.scrollHeight >
                pulsarBootTerminal.clientHeight &&
            pulsarBootLines.children.length >
                1
        ) {
            pulsarBootLines.removeChild(
                pulsarBootLines.firstElementChild
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
            hardware.network === "ONLINE"
                ? "OK"
                : "WARN",

            `Network interface ....... ${hardware.network}`
        ],

        [
            hardware.serial === "AVAILABLE"
                ? "OK"
                : "WARN",

            `Web Serial .............. ${hardware.serial}`
        ],

        [
            hardware.usb === "AVAILABLE"
                ? "OK"
                : "WARN",

            `Web USB ................. ${hardware.usb}`
        ],

        [
            hardware.gamepad !== "UNSUPPORTED"
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
            `Wallpaper ............... ${PulsarStorage.get(
                "system.wallpaper",
                "pulsar"
            ).toUpperCase()}`
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
    document
        .querySelectorAll(".window")
        .forEach(
            function (windowElement) {
                windowElement.style.display =
                    "none";

                windowElement.classList.add(
                    "hidden"
                );
            }
        );

    closeSystemMenu();
    deselectIcons();
}

// ========================================
// RUN BOOT TERMINAL
// ========================================

async function runPulsarTerminal() {
    const database =
        createPulsarBootDatabase();

    for (const entry of database) {
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

    await pulsarWait(260);

    pulsarBoot.classList.add(
        "boot-finished"
    );

    await pulsarWait(900);

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
    preparePulsarDesktop();

    if (!pulsarBoot) {
        console.warn(
            "PULSAR // BOOT LAYER NOT FOUND"
        );

        return;
    }

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

        if (pulsarBootBrand) {
            pulsarBootBrand.classList.add(
                "boot-brand-leaving"
            );
        }

        await pulsarWait(420);

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
            "PULSAR OS // BUILD 1.0 // READY"
        );
    } catch (error) {
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

function updateNetworkIndicator() {
    if (!networkIndicator) {
        return;
    }

    const online =
        navigator.onLine;

    networkIndicator.classList.toggle(
        "offline",
        !online
    );

    const status =
        online
            ? "NETWORK // ONLINE"
            : "NETWORK // OFFLINE";

    networkIndicator.title =
        status;

    networkIndicator.setAttribute(
        "aria-label",
        status
    );

    console.log(
        `PULSAR // ${status}`
    );
}

window.addEventListener(
    "online",
    updateNetworkIndicator
);

window.addEventListener(
    "offline",
    updateNetworkIndicator
);

updateNetworkIndicator();
// ========================================
// WINDOW RESIZE SAFETY
// ========================================

window.addEventListener(
    "resize",
    function () {
        if (!desktop) {
            return;
        }

        document
            .querySelectorAll(".window")
            .forEach(
                function (windowElement) {
                    const state =
                        PulsarWindowManager
                            .getWindowState(
                                windowElement
                            );

                    if (
                        !state ||
                        !state.open ||
                        state.minimized
                    ) {
                        return;
                    }

                    if (state.maximized) {
                        windowElement.style.left =
                            "0px";

                        windowElement.style.top =
                            "0px";

                        windowElement.style.width =
                            desktop.clientWidth +
                            "px";

                        windowElement.style.height =
                            desktop.clientHeight +
                            "px";

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

                    windowElement.style.left =
                        Math.max(
                            0,
                            Math.min(
                                windowElement.offsetLeft,
                                maxLeft
                            )
                        ) + "px";

                    windowElement.style.top =
                        Math.max(
                            0,
                            Math.min(
                                windowElement.offsetTop,
                                maxTop
                            )
                        ) + "px";
                }
            );
    }
);

// ========================================
// PULSAR POWER ON
// ========================================

startPulsarBoot();