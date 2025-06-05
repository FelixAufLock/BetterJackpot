const a = browser.storage
browser.runtime.onInstalled.addListener(() => {
    a.local.get(['openPacksEnabled']).then((e) => {
        typeof e.openPacksEnabled > 'u' && a.local.set({ openPacksEnabled: !0 })
    })
})
browser.tabs.onUpdated.addListener((e, s, n) => {
    var t
    !s.status !== 'complete' &&
        (t = n.url) != null &&
        t.includes('jackpot.de') &&
        browser.tabs.update(e, { muted: !0 })
})
