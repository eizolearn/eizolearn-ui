import { writable } from 'svelte/store'

type Value = 'open' | 'close'

export type State = ReturnType<typeof constructState>
export const constructState = () => {
    const { subscribe, set } = writable<Value>('close')

    return {
        subscribe,
        open() {
            set('open')
        },
        close() {
            set('close')
        }
    }
}
