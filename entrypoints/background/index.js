import './incrementCounter.js'
import './getSetting.js'
import { initMuteTabs } from './muteTabs.js'

export default defineBackground(() => {
    // TODO: check if required in chrome, in firefox its not
    browser.runtime.onInstalled.addListener(() => {
        console.warn('Service Worker gestartet')
    })

    initMuteTabs()
})

// not used, just prepared
function updateBadge(tabId, showBadge) {
    // maybe use different icons instead of badge
    if (showBadge) {
        browser.action.setBadgeText({ tabId, text: '.' })
        browser.action.setBadgeBackgroundColor({ tabId, color: '#00cc00' }) // grün
    } else {
        browser.action.setBadgeText({ tabId, text: '' })
    }
}
