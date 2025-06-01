const storage = browser.storage

document.addEventListener('DOMContentLoaded', () => {
    const balanceDisplay = document.getElementById('balanceDisplay')
    const checkbox = document.getElementById('autoclickerToggle')
    const clickCountElem = document.getElementById('clickCount')

    initBalanceUpdater(balanceDisplay)
    initAutoclickerToggle(checkbox)
    initClickCounterDisplay(clickCountElem)
})
/**
 * Initialisiert das regelmäßige Abrufen des Kontostands.
 */
function initBalanceUpdater(displayElem) {
    fetchBalance(displayElem) // initialer Abruf
    setInterval(() => fetchBalance(displayElem), 1000) // alle 1 Sekunde
}

function fetchBalance(displayElem) {
    browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length === 0) {
            displayElem.textContent = 'Kein aktiver Tab gefunden.'
            return
        }

        const tab = tabs[0]
        // const url = tab.url

        // Prüfen, ob "jackpot" in der URL vorkommt
        /*         if (!url.includes('jackpot')) {
            displayElem.textContent = `Fehler: Diese Seite wird nicht unterstützt (${url})`
            return
        } */

        browser.tabs.sendMessage(
            tab.id,
            { type: 'GET_BALANCE' },
            (response) => {
                if (response && response.balance) {
                    displayElem.textContent = `Kontostand: ${response.balance}`
                } else {
                    displayElem.textContent =
                        'Fehler beim Abrufen des Kontostands.'
                }
            }
        )
    })
}

/**
 * Initialisiert die Checkbox zur Steuerung des Autoklickers.
 */
function initAutoclickerToggle(checkboxElem) {
    // Zustand laden und an aktiven Tab senden
    storage.local.get(['autoclickerEnabled'], (result) => {
        const enabled = result.autoclickerEnabled ?? false
        checkboxElem.checked = enabled
        toggleAutoclickerInActiveTab(enabled)
    })

    // Bei Änderung speichern und an aktiven Tab senden
    checkboxElem.addEventListener('change', () => {
        const enabled = checkboxElem.checked
        storage.local.set({ autoclickerEnabled: enabled })
        toggleAutoclickerInActiveTab(enabled)
    })
}

/**
 * Initialisiert die Anzeige des Klickzählers.
 */
function initClickCounterDisplay(displayElem) {
    function updateCounter() {
        storage.local.get(['clickCount'], (result) => {
            displayElem.textContent = result.clickCount ?? 0
        })
    }

    updateCounter() // initial anzeigen
    setInterval(updateCounter, 1000) // regelmäßig aktualisieren
}

/**
 * Sendet eine Nachricht an den aktiven Tab, um den Autoklicker ein- oder auszuschalten.
 */
function toggleAutoclickerInActiveTab(enabled) {
    browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length === 0) return
        browser.tabs.sendMessage(tabs[0].id, {
            type: 'SET_AUTOCLICKER',
            enabled,
        })
    })
}
