import { BaseClicker } from './baseClicker.js'

const CLASS_PREFIX = 'ng-tns-c4084794385-'

function matchOpenPacksButton(btn) {
    return (
        btn instanceof HTMLButtonElement &&
        [...btn.classList].some((cls) => cls.startsWith(CLASS_PREFIX))
    )
}

export const openPacksClicker = new BaseClicker({
    counterItemName: 'openPacksClickCount',
    settingItemName: 'openPacksEnabled',
    buttonMatchFn: matchOpenPacksButton,
})
