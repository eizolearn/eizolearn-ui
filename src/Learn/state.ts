import { writable } from 'svelte/store';


type State = "input" | "success" | "failure"
const TIMEOUT = 1_000

export const learningState = (() => {
    const { subscribe, set } = writable<State>("input");
    return {
        subscribe,
        succeed() {
            set("success")
            setTimeout(() => {
                set("input")
            }, TIMEOUT)
        },
        fail() {
            set("failure")
            setTimeout(() => {
                set("input")
            }, TIMEOUT)
        },
    };
})()