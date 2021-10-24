import { writable } from 'svelte/store'

type Value = 'input' | 'success' | 'failure'
const TIMEOUT = 1_000

export type State = ReturnType<typeof constructState>
export const constructState = () => {
    const { subscribe, set } = writable<Value>('input')

    return {
        subscribe,
        succeed() {
            set('success')

            setTimeout(() => {
                set('input')
            }, TIMEOUT)
        },
        fail() {
            set('failure')

            setTimeout(() => {
                set('input')
            }, TIMEOUT)
        },
    }
}
