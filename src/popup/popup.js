const storage = browser.storage

document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('toggleOpenPacks')
    const countElem = document.getElementById('countOpenPacks')

    storage.local.get(['openPacksEnabled', 'openPacksClickCount'], (result) => {
        toggle.checked = result.openPacksEnabled ?? false
        countElem.textContent = result.openPacksClickCount ?? 0
    })

    toggle.addEventListener('change', () => {
        const enabled = toggle.checked
        storage.local.set({ openPacksEnabled: enabled })
        toggleClickerInActiveTab(enabled)
    })

    setInterval(() => {
        storage.local.get(['openPacksClickCount'], (result) => {
            countElem.textContent = result.openPacksClickCount ?? 0
        })
    }, 1000)
})

function toggleClickerInActiveTab(enabled) {
    console.warn('autoklicker funktion augferufne')
    browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length === 0) return
        browser.tabs.sendMessage(tabs[0].id, {
            type: 'SET_AUTOCLICKER',
            clicker: 'openPacks',
            enabled,
        })
    })
}

document.addEventListener('DOMContentLoaded', () => {
    const balanceDisplay = document.getElementById('balanceDisplay')
    // const checkbox = document.getElementById('autoclickerToggle')
    // const clickCountElem = document.getElementById('clickCount')

    initBalanceUpdater(balanceDisplay)
    // initAutoclickerToggle(checkbox)
    // initClickCounterDisplay(clickCountElem)
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
                    console.warn('response:', response)
                    displayElem.textContent =
                        'Fehler beim Abrufen des Kontostands.'
                }
            }
        )
    })
}
