<script lang="ts">
    import type { TranscripedSymbol } from '../Alphabet/alphabet'
    import { constructState } from './state'
    import CheckMark from './checkmark.svg'
    import Cross from './cross.svg'
    import Enter from './enter.svg'
    import SkippedCross from './skipped.svg'
    import TranscriptionInputField from './TranscriptionInputField.svelte'

    const MAX_INPUT_LENGTH = 5

    export let currentTranscripedSymbol: TranscripedSymbol
    export const inputState = constructState()

    let transcriptionInput = ''
</script>

<div class="flex items-center bg-white rounded-lg text-input border border-primary w-60 h-9 mx-auto">
    <TranscriptionInputField
        MAX_INPUT_LENGTH="{MAX_INPUT_LENGTH}"
        transcriptionInput="{transcriptionInput}"
        inputState="{inputState}"
        currentTranscripedSymbol="{currentTranscripedSymbol}"
    />
    {#if $inputState === 'input'}
        <Enter class="mr-1" />
    {:else if $inputState === 'success' || $inputState === 'success with suggestion'}
        <CheckMark class="mr-1" />
    {:else if $inputState === 'skipped'}
        <SkippedCross class="mr-1" />
    {:else if $inputState === 'failure'}
        <Cross class="mr-1" />
    {/if}
</div>
