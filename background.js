const storage = browser.storage

// Beim Installieren der Erweiterung
chrome.runtime.onInstalled.addListener(() => {
    // Setze Standardwert nur, wenn noch nicht vorhanden
    storage.local.get(['autoclickerEnabled'], (result) => {
        if (typeof result.autoclickerEnabled === 'undefined') {
            storage.local.set({ autoclickerEnabled: true })
        }
    })
})

// Wenn ein Tab aktualisiert wird (z. B. neu lädt)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url?.includes('jackpot.de')) {
        chrome.tabs.update(tabId, { muted: true })
    }
})
