const storage = browser.storage

let isMuteTabsListenerActive = false

function muteJackpotTabs(tabId, changeInfo, tab) {
    if (changeInfo.status !== 'complete') return
    if (tab.url?.includes('jackpot.de')) {
        browser.tabs.update(tabId, { muted: true })
    }
}

function enableMuteTabsListener() {
    if (!isMuteTabsListenerActive) {
        browser.tabs.onUpdated.addListener(muteJackpotTabs)
        isMuteTabsListenerActive = true
        console.log('MuteTabs aktiviert')
    }
}

function disableMuteTabsListener() {
    if (isMuteTabsListenerActive) {
        browser.tabs.onUpdated.removeListener(muteJackpotTabs)
        isMuteTabsListenerActive = false
        console.log('MuteTabs deaktiviert')
    }
}

export function initMuteTabs() {
    storage.local.get('muteTabsEnabled').then((result) => {
        if (result.muteTabsEnabled) {
            enableMuteTabsListener()
        } else {
            disableMuteTabsListener()
        }
    })

    storage.onChanged.addListener((changes, area) => {
        if (area === 'local' && 'muteTabsEnabled' in changes) {
            const newValue = changes.muteTabsEnabled.newValue
            if (newValue) {
                enableMuteTabsListener()
            } else {
                disableMuteTabsListener()
            }
        }
    })
}
