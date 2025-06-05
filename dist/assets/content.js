class c {
    constructor({ key: t, buttonMatchFn: e }) {
        ;(this.key = t), (this.buttonMatchFn = e), (this.observer = null)
    }
    start() {
        this.observer ||
            ((this.observer = new MutationObserver((t) => {
                for (const e of t)
                    for (const s of e.addedNodes) this.tryClickButtonInNode(s)
            })),
            this.observer.observe(document.body, {
                childList: !0,
                subtree: !0,
            }),
            this.tryClickButtonInNode(document.body))
    }
    stop() {
        this.observer && (this.observer.disconnect(), (this.observer = null))
    }
    tryClickButtonInNode(t) {
        var s
        const e =
            ((s = t.querySelectorAll) == null ? void 0 : s.call(t, 'button')) ||
            []
        for (const o of e)
            this.buttonMatchFn(o) && (o.click(), this.incrementCounter())
        t instanceof HTMLButtonElement &&
            this.buttonMatchFn(t) &&
            (t.click(), this.incrementCounter())
    }
    incrementCounter() {
        browser.storage.local.get([this.key], (t) => {
            const e = t[this.key] ?? 0
            browser.storage.local.set({ [this.key]: e + 1 })
        })
    }
}
const i = 'ng-tns-c4084794385-'
function a(n) {
    return (
        n instanceof HTMLButtonElement &&
        [...n.classList].some((t) => t.startsWith(i))
    )
}
const l = new c({ key: 'openPacksClickCount', buttonMatchFn: a })
browser.storage
const r = { openPacks: l }
browser.runtime.onMessage.addListener((n) => {
    const t = r[n.clicker]
    t && n.type === 'SET_AUTOCLICKER' && (n.enabled ? t.start() : t.stop())
})
browser.storage.local.get(null, (n) => {
    var t
    for (const [e, s] of Object.entries(n))
        if (e.endsWith('Enabled') && s) {
            const o = e.replace('Enabled', '')
            ;(t = r[o]) == null || t.start()
        }
})
console.warn('Clicker in content.js geladen')
browser.runtime.onMessage.addListener((n, t, e) => {
    if (n.type === 'GET_BALANCE') {
        const s = document.querySelector('jps-digit-counter.ng-star-inserted'),
            o = s ? s.textContent.trim() : 'Kein Kontostand gefunden'
        e({ balance: o })
    }
})
