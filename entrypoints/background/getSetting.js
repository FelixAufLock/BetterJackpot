const settings = {
    openPacksEnabled,
}

browser.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message.type === 'GET_SETTING') {
        const item = settings[message.key]
        item.getValue().then((value) => sendResponse(value))
        return true
    }
})
