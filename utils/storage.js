import { storage } from '#imports'

export const openPacksEnabled = storage.defineItem('local:openPacksEnabled', {
    fallback: true,
})

export const muteTabsEnabled = storage.defineItem('local:muteTabsEnabled', {
    fallback: true,
})

export const openPacksClickCount = storage.defineItem(
    'local:openPacksClickCount',
    {
        fallback: 0,
    }
)
