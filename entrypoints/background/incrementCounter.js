const counterItems = {
    openPacksClickCount,
    // anotherCounter,
}

browser.runtime.onMessage.addListener((message) => {
    if (message.type !== 'INCREMENT_COUNTER') return

    const counterItemName = message.counterItemName
    const item = counterItems[counterItemName]

    incrementCounter(item)
})

async function incrementCounter(item) {
    const current = await item.getValue()
    await item.setValue((current ?? 0) + 1)
}
