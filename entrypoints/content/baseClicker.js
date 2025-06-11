export class BaseClicker {
    constructor({ counterItemName, settingItemName, buttonMatchFn }) {
        this.counterItemName = counterItemName
        this.settingItemName = settingItemName
        this.buttonMatchFn = buttonMatchFn
        this.observer = null
        this.init()
    }

    async init() {
        const shouldStart = await this.shouldStart()
        if (shouldStart) this.start()
    }

    async shouldStart() {
        const result = await browser.runtime.sendMessage({
            type: 'GET_SETTING',
            key: this.settingItemName,
        })
        return result === true
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
        browser.runtime.sendMessage({
            type: 'INCREMENT_COUNTER',
            counterItemName: this.counterItemName,
        })
    }
}
