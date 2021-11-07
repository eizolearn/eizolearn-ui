<script lang="ts">
    import { constructScore } from './score'
    import type { State as TranscriptionInputState } from '../TranscriptionInput/state'

    export let inputState: TranscriptionInputState
    export const score = constructScore(inputState)
</script>

<span class="text-score text-center font-nunito">
    {$score}
</span>
