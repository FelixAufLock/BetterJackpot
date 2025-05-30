// -----------------------------------------------
// Anfrage für Kontostand
// -----------------------------------------------
browser.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === 'GET_BALANCE') {
        const balanceElement = document.querySelector(
            'jps-digit-counter.ng-star-inserted'
        )
        const balance = balanceElement
            ? balanceElement.textContent.trim()
            : 'Kein Kontostand gefunden'
        sendResponse({ balance })
    }
})

const storage = browser.storage
// Direkt beim Laden prüfen, ob Autoklicker aktiv sein soll
storage.local.get(['autoclickerEnabled'], (result) => {
    if (result.autoclickerEnabled) {
        startAutoclicker()
    }
})

// -----------------------------------------------
// Autoklicker (nur wenn in den Einstellungen aktiv)
// -----------------------------------------------

// "Open Packs" & "Collect Cards" are the same button
// every new button's class has this prefix and 2-3 digits like 69 or 420
const OPEN_PACKS_BUTTON_CLASS_PREFIX = 'ng-tns-c4084794385-'
let observer = null

function isMatchingButton(el) {
    if (!(el instanceof HTMLButtonElement)) return false
    return Array.from(el.classList).some((cls) =>
        cls.startsWith(OPEN_PACKS_BUTTON_CLASS_PREFIX)
    )
}

function incrementClickCounter() {
    storage.local.get(['clickCount'], (result) => {
        const count = result.clickCount ?? 0
        storage.local.set({ clickCount: count + 1 })
    })
}

function tryClickButtonInSubtree(node) {
    const buttons = node.querySelectorAll?.('button') || []
    for (const btn of buttons) {
        if (isMatchingButton(btn)) {
            console.log('Auto-Clicker: Button gefunden und geklickt')
            btn.click()
            incrementClickCounter()
        }
    }

    if (isMatchingButton(node)) {
        console.log('Auto-Clicker: Einzelner Button gefunden und geklickt')
        node.click()
        incrementClickCounter()
    }
}

function startAutoclicker() {
    if (observer) return

    observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            for (const addedNode of mutation.addedNodes) {
                tryClickButtonInSubtree(addedNode)
            }
        }
    })

    observer.observe(document.body, { childList: true, subtree: true })
    tryClickButtonInSubtree(document.body) // initiale Prüfung
    console.log('Autoklicker gestartet')
}

function stopAutoclicker() {
    if (observer) {
        observer.disconnect()
        observer = null
        console.log('Autoklicker gestoppt')
    }
}

// Nachrichten vom Popup entgegennehmen
browser.runtime.onMessage.addListener((msg) => {
    if (msg.type === 'SET_AUTOCLICKER') {
        msg.enabled ? startAutoclicker() : stopAutoclicker()
    }
})
