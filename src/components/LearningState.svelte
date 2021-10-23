export class succeed {
}
<script lang="ts">
    type State = "input" | "success" | "failure"
    export let state: State = "input"

    const TIMEOUT = 1_000
    export function succeed() {
        state = "success"
        setTimeout(() => {
            state = "input"
        }, TIMEOUT)
    }
    export function fail() {
        state = "failure"
        setTimeout(() => {
            state = "input"
        }, TIMEOUT)
    }
</script>
