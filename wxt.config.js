import { defineConfig } from 'wxt'

export default defineConfig({
    outDir: 'dist',
    manifest: {
        permissions: ['tabs', 'scripting', 'activeTab', 'storage'],
        host_permissions: ['<all_urls>'],
        action: {
            default_icon: {
                16: 'icon.jpeg',
                32: 'icon.jpeg',
                48: 'icon.jpeg',
            },
        },
    },
})
