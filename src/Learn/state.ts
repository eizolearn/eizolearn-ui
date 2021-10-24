import { writable } from 'svelte/store'
import type { TranscripedAlphabet } from './alphabets'

type Value = 'learnt' | 'learning'
const THRESHOLD = 2

export type State = ReturnType<typeof constructState>
export const constructState = (alphabet: TranscripedAlphabet) => {
    const successHistory: Map<string, number> = new Map()
    const isLearnt = () =>
        successHistory.size === alphabet.length() &&
        [...successHistory.values()].every(successes => successes >= THRESHOLD)

    const { subscribe, set } = writable<Value>('learning')
    let value = false

    return {
        subscribe,
        hit(symbol: string) {
            successHistory.set(symbol, (successHistory.get(symbol) ?? 0) + 1)
            if (!value && isLearnt()) {
                value = true
                set('learnt')
            }
        },
        miss() {
            successHistory.clear()
            if (value) {
                value = false
                set('learning')
            }
        },
    }
}
