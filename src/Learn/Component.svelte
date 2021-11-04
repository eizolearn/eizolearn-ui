<script lang="ts">
    import { onMount } from 'svelte'
    import type { TranscripedSymbol, TranscripedAlphabet } from '../Alphabet/alphabet'
    import { constructState } from './state'
    import TranscriptionInput from '../TranscriptionInput/Component.svelte'
    import type { State as TranscriptionInputState } from '../TranscriptionInput/state'
    import Score from '../Score/Component.svelte'

    export let alphabet: TranscripedAlphabet
    export const state = constructState(alphabet)

    let inputState: TranscriptionInputState
    let currentTranscripedSymbol: TranscripedSymbol = alphabet.random

    $: isSuccess = $inputState === 'success'
    $: isSuccessWithSuggestion = $inputState === 'success with suggestion'
    $: isFailure = $inputState === 'failure'
    $: isSkipped = $inputState === 'skipped'

    onMount(() => {
        inputState.subscribe(value => {
            if (value === 'input') {
                currentTranscripedSymbol = alphabet.random
            } else if (value === 'success' || value === 'success with suggestion') {
                state.hit(currentTranscripedSymbol.symbol)
            } else if (value === 'failure' || value === 'skipped') {
                state.miss()
            }
        })
    })
</script>

<style>
    .isSuccess {
        @apply bg-gradient-to-t;
        @apply from-success;
        @apply via-success;
        @apply to-white;
    }
    .isFailure {
        @apply bg-gradient-to-t;
        @apply from-failure;
        @apply via-failure;
        @apply to-white;
    }
    .isSkipped {
        @apply bg-gradient-to-t;
        @apply from-skipped;
        @apply via-skipped;
        @apply to-white;
    }
</style>

<div
    class="h-screen pt-header flex flex-col items-center text-primary mx-auto object-contain relative"
    class:isSuccess="{isSuccess || isSuccessWithSuggestion}"
    class:isFailure
    class:isSkipped
>
    {#if inputState}
        <Score inputState="{inputState}" />
    {/if}

    <span class="text-symbol">{currentTranscripedSymbol.symbol}</span>
    <p class="{isFailure || isSkipped || isSuccessWithSuggestion ? '' : 'invisible'} text-transcription">
        {currentTranscripedSymbol.displayedTranscription}
    </p>
    <TranscriptionInput currentTranscripedSymbol="{currentTranscripedSymbol}" bind:inputState />
</div>
