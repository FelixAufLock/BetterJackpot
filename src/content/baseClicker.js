export class BaseClicker {
    constructor({ key, buttonMatchFn }) {
        this.key = key
        this.buttonMatchFn = buttonMatchFn
        this.observer = null
    }

    start() {
        if (this.observer) return

        this.observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                for (const node of mutation.addedNodes) {
                    this.tryClickButtonInNode(node)
                }
            }
        })

        this.observer.observe(document.body, {
            childList: true,
            subtree: true,
        })

        this.tryClickButtonInNode(document.body)
    }

    stop() {
        if (this.observer) {
            this.observer.disconnect()
            this.observer = null
        }
    }

    tryClickButtonInNode(node) {
        const buttons = node.querySelectorAll?.('button') || []
        for (const btn of buttons) {
            if (this.buttonMatchFn(btn)) {
                btn.click()
                this.incrementCounter()
            }
        }

        if (node instanceof HTMLButtonElement && this.buttonMatchFn(node)) {
            node.click()
            this.incrementCounter()
        }
    }

    incrementCounter() {
        browser.storage.local.get([this.key], (result) => {
            const count = result[this.key] ?? 0
            browser.storage.local.set({ [this.key]: count + 1 })
        })
    }
}
