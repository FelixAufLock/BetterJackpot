const storage = browser.storage

let isMuteTabsListenerActive = false

function isJackpotTab(tab) {
    return tab.url?.includes('jackpot.de')
}

function muteTab(tabId) {
    browser.tabs.update(tabId, { muted: true })
}

function muteJackpotTabs(tabId, changeInfo, tab) {
    if (changeInfo.status !== 'complete') return
    if (isJackpotTab(tab)) {
        muteTab(tabId)
    }
}

function enableMuteTabsListener() {
    if (!isMuteTabsListenerActive) {
        browser.tabs.onUpdated.addListener(muteJackpotTabs)
        isMuteTabsListenerActive = true
        console.log('MuteTabs aktiviert')

        // mute tabs when enabling muteTabsEnabled without reloading existing tabs
        browser.tabs.query({}).then((tabs) => {
            for (const tab of tabs) {
                if (isJackpotTab(tab)) {
                    muteTab(tab.id)
                }
            }
        })
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
