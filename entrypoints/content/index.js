import { openPacksClicker } from './openPacksClicker.js'

export default defineContentScript({
    matches: ['*://*.jackpot.de/*'],
    async main() {
        const clickers = {
            openPacks: openPacksClicker,
        }

        browser.runtime.onMessage.addListener((msg) => {
            const clicker = clickers[msg.clicker]
            if (!clicker) return

            if (msg.type === 'SET_AUTOCLICKER') {
                msg.enabled ? clicker.start() : clicker.stop()
            }
        })

        browser.runtime.onMessage.addListener((msg, sender, sendResponse) => {
            if (msg.type === 'GET_BALANCE') {
                const balanceElement = document.querySelector(
                    'jps-digit-counter.ng-star-inserted'
                )
                const balance = balanceElement
                    ? balanceElement.textContent?.trim() ??
                      'Kein Kontostand gefunden'
                    : 'Kein Kontostand gefunden'
                sendResponse({ balance })
            }
        })
    },
})
