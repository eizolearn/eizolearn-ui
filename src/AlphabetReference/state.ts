import { writable } from 'svelte/store'

type Value = 'open' | 'closed'

export type State = ReturnType<typeof constructState>
export const constructState = () => {
    const { subscribe, set } = writable<Value>('closed')

    return {
        subscribe,
        open() {
            set('open')
        },
        close() {
            set('closed')
        }
    }
}
