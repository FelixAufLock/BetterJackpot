import './install.js'
import { initMuteTabs } from './muteTabs.js'

initMuteTabs()

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
