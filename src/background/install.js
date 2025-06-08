const storage = browser.storage

const defaultSettings = {
    openPacksEnabled: true,
    muteTabsEnabled: true,
}

// set default values during installation
browser.runtime.onInstalled.addListener(() => {
    storage.local.get(Object.keys(defaultSettings)).then((result) => {
        const settingsToSet = {}

        for (const [key, defaultValue] of Object.entries(defaultSettings)) {
            if (typeof result[key] === 'undefined') {
                settingsToSet[key] = defaultValue
            }
        }

        if (Object.keys(settingsToSet).length > 0) {
            storage.local.set(settingsToSet)
        }
    })
})
