chrome.runtime.onInstalled.addListener(() => {
    console.log('Erweiterung installiert.')
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
        if (tab.url.includes('jackpot.de')) {
            chrome.tabs.update(tabId, { muted: true }, () => {
                console.log(
                    `Tab ${tabId} auf jackpot.de wurde stummgeschaltet.`
                )
            })
        }
    }
})
