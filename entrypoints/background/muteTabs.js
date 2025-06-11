let isMuteTabsListenerActive = false

function isJackpotTab(tab) {
    return tab.url?.includes('jackpot.de')
}

function muteTab(tab) {
    browser.tabs.update(tab.id, { muted: true })
}

function muteJackpotTabs(tabId, changeInfo, tab) {
    if (changeInfo.status !== 'complete') return
    if (isJackpotTab(tab)) {
        muteTab(tab)
    }
}

function enableMuteTabsListener() {
    if (!isMuteTabsListenerActive) {
        browser.tabs.onUpdated.addListener(muteJackpotTabs)
        isMuteTabsListenerActive = true

        // mute tabs that are already open when activating the muteTabs option
        browser.tabs.query({}).then((tabs) => {
            for (const tab of tabs) {
                if (isJackpotTab(tab)) {
                    muteTab(tab)
                }
            }
        })
    }
}

function disableMuteTabsListener() {
    if (isMuteTabsListenerActive) {
        browser.tabs.onUpdated.removeListener(muteJackpotTabs)
        isMuteTabsListenerActive = false
    }
}

export async function initMuteTabs() {
    const enabled = await muteTabsEnabled.getValue()
    if (enabled) {
        enableMuteTabsListener()
    } else {
        disableMuteTabsListener()
    }

    muteTabsEnabled.watch((newValue) => {
        if (newValue) {
            enableMuteTabsListener()
        } else {
            disableMuteTabsListener()
        }
    })
}
