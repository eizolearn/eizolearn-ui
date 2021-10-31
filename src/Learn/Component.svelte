<script lang="ts">
    import { onMount } from 'svelte'
    import type { TranscripedSymbol, TranscripedAlphabet } from './alphabets'
    import { constructState } from './state'
    import TranscriptionInput from '../TranscriptionInput/Component.svelte'
    import type { State as TranscriptionInputState } from '../TranscriptionInput/state'

    export let alphabet: TranscripedAlphabet
    export const state = constructState(alphabet)

    let inputState: TranscriptionInputState
    let currentLetter: TranscripedSymbol = alphabet.getRandom()

    $: isSuccess = $inputState === 'success'
    $: isFailure = $inputState === 'failure'
    $: isSkipped = $inputState === 'skipped'

    onMount(() => {
        inputState.subscribe(value => {
            if (value === 'input') {
                currentLetter = alphabet.getRandom()
            } else if (value === 'success') {
                state.hit(currentLetter.symbol)
            } else if (value === 'failure' || value === 'skipped') {
                state.miss()
            }
        })
    })
</script>

<style>
    .isSuccess {
        @apply bg-success;
    }
    .isFailure {
        @apply bg-failure;
    }
    .isSkipped {
        @apply bg-skipped;
    }
</style>

<div
    class="h-page flex flex-col items-center text-primary mx-auto object-contain"
    class:isSuccess
    class:isFailure
    class:isSkipped
>
    <span class="text-symbol">{currentLetter.symbol}</span>
    <TranscriptionInput currentTranscription="{currentLetter.transcription}" bind:inputState />

    {#if isFailure || isSkipped}
        <p class="text-input">{currentLetter.transcription.toUpperCase()}</p>
    {/if}
</div>
