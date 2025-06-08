const storage = browser.storage

document.addEventListener('DOMContentLoaded', () => {
    const toggleOpenPacks = document.getElementById('toggleOpenPacks')
    const toggleMuteTabs = document.getElementById('toggleMuteTabs')
    const countElem = document.getElementById('countOpenPacks')

    storage.local.get(['openPacksEnabled', 'openPacksClickCount'], (result) => {
        toggleOpenPacks.checked = result.openPacksEnabled ?? false
        countElem.textContent = result.openPacksClickCount ?? 0
    })

    storage.local.get(['muteTabsEnabled'], (result) => {
        toggleMuteTabs.checked = result.muteTabsEnabled ?? true
    })

    toggleMuteTabs.addEventListener('change', () => {
        const enabled = toggleMuteTabs.checked
        storage.local.set({ muteTabsEnabled: enabled })
    })

    toggleOpenPacks.addEventListener('change', () => {
        const enabled = toggleOpenPacks.checked
        storage.local.set({ openPacksEnabled: enabled })
        sendOpenPacksClickedMessage(enabled)
    })

    setInterval(() => {
        storage.local.get(['openPacksClickCount'], (result) => {
            countElem.textContent = result.openPacksClickCount ?? 0
        })
    }, 1000)
})

function sendOpenPacksClickedMessage(enabled) {
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
    initBalanceUpdater(balanceDisplay)
})

function initBalanceUpdater(displayElem) {
    fetchBalance(displayElem)
    setInterval(() => fetchBalance(displayElem), 1000)
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
