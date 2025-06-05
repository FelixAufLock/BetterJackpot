import { openPacksClicker } from './openPacksClicker.js'

const storage = browser.storage

const clickers = {
    openPacks: openPacksClicker,
    // z.B. collectBonus: collectBonusClicker
}

// get messages to start and stop clickers
browser.runtime.onMessage.addListener((msg) => {
    const clicker = clickers[msg.clicker]
    if (!clicker) return

    if (msg.type === 'SET_AUTOCLICKER') {
        msg.enabled ? clicker.start() : clicker.stop()
    }
})

// activates all clickers based on the stored values on startup
browser.storage.local.get(null, (result) => {
    for (const [key, value] of Object.entries(result)) {
        if (key.endsWith('Enabled') && value) {
            const clickerName = key.replace('Enabled', '')
            clickers[clickerName]?.start()
        }
    }
})

console.warn('Clicker in content.js geladen')

// message to get current balance
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
