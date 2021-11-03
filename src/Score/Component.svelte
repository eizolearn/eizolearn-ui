<script lang="ts">
    import type { State as TranscriptionInputState } from '../TranscriptionInput/state'
    import { constructScore } from './score'

    export let inputState: TranscriptionInputState
    export const score = constructScore(inputState)
</script>

<span class="mt-header text-score text-center absolute left-0 top-0 w-20 font-nunito">
    {$score}
</span>
