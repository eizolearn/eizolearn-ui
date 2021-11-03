<script lang="ts">
    import type { State as TranscriptionInputState } from '../TranscriptionInput/state'
    import { constructScore } from './score'

    export let inputState: TranscriptionInputState
    export const score = constructScore(inputState)
</script>

<span class="text-score text-center absolute left-0 top-0 w-20">
    {$score}
</span>
