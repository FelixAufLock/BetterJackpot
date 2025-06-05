const storage = browser.storage

// Beim Installieren der Erweiterung
browser.runtime.onInstalled.addListener(() => {
    storage.local.get(['openPacksEnabled']).then((result) => {
        if (typeof result.openPacksEnabled === 'undefined') {
            storage.local.set({ openPacksEnabled: true })
        }
    })
})

// Wenn ein Tab aktualisiert wurde
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (!changeInfo.status === 'complete') return
    if (tab.url?.includes('jackpot.de')) {
        // Tab muten
        browser.tabs.update(tabId, { muted: true })
        // updateBadge(tabId, true)
    } else {
        // updateBadge(tabId, false)
    }
})

function updateBadge(tabId, showBadge) {
    // maybe use different icons instead of badge
    if (showBadge) {
        browser.action.setBadgeText({ tabId, text: '.' })
        browser.action.setBadgeBackgroundColor({ tabId, color: '#00cc00' }) // grün
    } else {
        browser.action.setBadgeText({ tabId, text: '' })
    }
}
