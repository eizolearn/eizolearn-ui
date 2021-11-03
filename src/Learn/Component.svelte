<script lang="ts">
    import { onMount } from 'svelte'
    import type { TranscripedSymbol, TranscripedAlphabet } from './alphabets'
    import { constructState } from './state'
    import TranscriptionInput from '../TranscriptionInput/Component.svelte'
    import type { State as TranscriptionInputState } from '../TranscriptionInput/state'
    import Score from '../Score/Component.svelte'

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
    class:isSuccess
    class:isFailure
    class:isSkipped
>
    {#if inputState}
        <Score inputState="{inputState}" />
    {/if}
    <span class="text-symbol">{currentLetter.symbol}</span>
    <TranscriptionInput currentTranscription="{currentLetter.transcription}" bind:inputState />

    {#if isFailure || isSkipped}
        <p class="text-input">{currentLetter.transcription.toUpperCase()}</p>
    {/if}
</div>
