;(function () {
    const n = document.createElement('link').relList
    if (n && n.supports && n.supports('modulepreload')) return
    for (const t of document.querySelectorAll('link[rel="modulepreload"]')) c(t)
    new MutationObserver((t) => {
        for (const r of t)
            if (r.type === 'childList')
                for (const s of r.addedNodes)
                    s.tagName === 'LINK' && s.rel === 'modulepreload' && c(s)
    }).observe(document, { childList: !0, subtree: !0 })
    function o(t) {
        const r = {}
        return (
            t.integrity && (r.integrity = t.integrity),
            t.referrerPolicy && (r.referrerPolicy = t.referrerPolicy),
            t.crossOrigin === 'use-credentials'
                ? (r.credentials = 'include')
                : t.crossOrigin === 'anonymous'
                  ? (r.credentials = 'omit')
                  : (r.credentials = 'same-origin'),
            r
        )
    }
    function c(t) {
        if (t.ep) return
        t.ep = !0
        const r = o(t)
        fetch(t.href, r)
    }
})()
const a = browser.storage
document.addEventListener('DOMContentLoaded', () => {
    const e = document.getElementById('toggleOpenPacks'),
        n = document.getElementById('countOpenPacks')
    a.local.get(['openPacksEnabled', 'openPacksClickCount'], (o) => {
        ;(e.checked = o.openPacksEnabled ?? !1),
            (n.textContent = o.openPacksClickCount ?? 0)
    }),
        e.addEventListener('change', () => {
            const o = e.checked
            a.local.set({ openPacksEnabled: o }), l(o)
        }),
        setInterval(() => {
            a.local.get(['openPacksClickCount'], (o) => {
                n.textContent = o.openPacksClickCount ?? 0
            })
        }, 1e3)
})
function l(e) {
    console.warn('autoklicker funktion augferufne'),
        browser.tabs.query({ active: !0, currentWindow: !0 }, (n) => {
            n.length !== 0 &&
                browser.tabs.sendMessage(n[0].id, {
                    type: 'SET_AUTOCLICKER',
                    clicker: 'openPacks',
                    enabled: e,
                })
        })
}
document.addEventListener('DOMContentLoaded', () => {
    const e = document.getElementById('balanceDisplay')
    u(e)
})
function u(e) {
    i(e), setInterval(() => i(e), 1e3)
}
function i(e) {
    browser.tabs.query({ active: !0, currentWindow: !0 }, (n) => {
        if (n.length === 0) {
            e.textContent = 'Kein aktiver Tab gefunden.'
            return
        }
        const o = n[0]
        browser.tabs.sendMessage(o.id, { type: 'GET_BALANCE' }, (c) => {
            c && c.balance
                ? (e.textContent = `Kontostand: ${c.balance}`)
                : (console.warn('response:', c),
                  (e.textContent = 'Fehler beim Abrufen des Kontostands.'))
        })
    })
}
