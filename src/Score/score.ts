import { writable } from 'svelte/store'
import type { State as TranscriptionInputState } from '../TranscriptionInput/state'

export type Score = ReturnType<typeof constructScore>
export const constructScore = (inputState: TranscriptionInputState) => {
    const { subscribe, set, update } = writable<number>(0)
    inputState.subscribe(value => {
        if (value === 'success') {
            update(score => score + 1)
        } else if (value === 'failure' || value === 'skipped') {
            set(0)
        }
    })

    return {
        subscribe,
    }
}
