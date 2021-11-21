import { writable } from 'svelte/store'

export type SettingsValue = {
    input: 'Text' | 'Options',
}

export type Settings = ReturnType<typeof constructSettings>
export const constructSettings = () => {
    let initialSettings: SettingsValue = {
        input: 'Text',
    }
    try {
        const locallyStoredSettings = localStorage.getItem('settings')
        if (locallyStoredSettings) {
            initialSettings = {
                ...initialSettings,
                ...JSON.parse(locallyStoredSettings)
            } as SettingsValue
        }
    } catch (err) {
        console.error(err)
        localStorage.removeItem('settings')
    }
    const { subscribe, set } = writable<SettingsValue>(initialSettings)

    return {
        subscribe,
        set(value: SettingsValue) {
            set(value)
            localStorage.setItem('settings', JSON.stringify(value))
        },
    }
}
