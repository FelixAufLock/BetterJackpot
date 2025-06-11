document.addEventListener('DOMContentLoaded', () => {
    const toggleOpenPacks = document.getElementById('toggleOpenPacks')
    const toggleMuteTabs = document.getElementById('toggleMuteTabs')
    const countElem = document.getElementById('countOpenPacks')
    const balanceDisplay = document.getElementById('balanceDisplay')

    // Initiales Laden der gespeicherten Werte
    Promise.all([
        openPacksEnabled.getValue(),
        openPacksClickCount.getValue(),
        muteTabsEnabled.getValue(),
    ]).then(([packsEnabled, clickCount, muteEnabled]) => {
        if (toggleOpenPacks) toggleOpenPacks.checked = packsEnabled
        if (countElem) countElem.textContent = clickCount.toString()
        if (toggleMuteTabs) toggleMuteTabs.checked = muteEnabled
    })

    toggleMuteTabs.addEventListener('change', () => {
        const enabled = toggleMuteTabs.checked
        muteTabsEnabled.setValue(enabled)
    })

    toggleOpenPacks.addEventListener('change', () => {
        const enabled = toggleOpenPacks.checked
        openPacksEnabled.setValue(enabled)
        sendOpenPacksClickedMessage(enabled)
    })

    setInterval(async () => {
        const count = await openPacksClickCount.getValue()
        if (countElem) countElem.textContent = count.toString()
    }, 1000)

    if (balanceDisplay) {
        initBalanceUpdater(balanceDisplay)
    }
})

function sendOpenPacksClickedMessage(enabled) {
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
        if (tabs.length === 0) return
        browser.tabs.sendMessage(tabs[0].id, {
            type: 'SET_AUTOCLICKER',
            clicker: 'openPacks',
            enabled,
        })
    })
}

function initBalanceUpdater(displayElem) {
    fetchBalance(displayElem)
    setInterval(() => fetchBalance(displayElem), 1000)
}

function fetchBalance(displayElem) {
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
        if (tabs.length === 0) {
            displayElem.textContent = 'Kein aktiver Tab gefunden.'
            return
        }

        const tab = tabs[0]
        browser.tabs
            .sendMessage(tab.id, { type: 'GET_BALANCE' })
            .then((response) => {
                if (response && response.balance) {
                    displayElem.textContent = `Kontostand: ${response.balance}`
                } else {
                    displayElem.textContent =
                        'Fehler beim Abrufen des Kontostands.'
                }
            })
    })
}
