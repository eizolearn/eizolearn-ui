<script lang="ts">
    import { onMount } from 'svelte'
    import type { TranscripedSymbol, TranscripedAlphabet } from '../Alphabet/alphabet'
    import type { State as AlphabetReferenceState } from '../AlphabetReference/state'
    import type { State as TranscriptionInputState } from '../TranscriptionInput/state'
    import type { Settings } from '../Settings/settings'
    import { constructState } from './state'
    import AlphabetReference from '../AlphabetReference/Component.svelte'
    import AlphabetReferenceIcon from '../AlphabetReference/Icon.svelte'
    import Score from '../Score/Component.svelte'
    import TranscriptionInput from '../TranscriptionInput/Component.svelte'

    export let alphabet: TranscripedAlphabet
    export let settings: Settings
    export const state = constructState(alphabet)

    let inputState: TranscriptionInputState
    let alphabetReferenceState: AlphabetReferenceState
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
    class="h-page flex flex-col items-center text-primary mx-auto object-contain"
    class:isSuccess="{isSuccess || isSuccessWithSuggestion}"
    class:isFailure
    class:isSkipped
>
    <div class="w-full flex flex-nowrap justify-between items-baseline">
        <div class="flex justify-center w-20">
            {#if inputState}
                <Score inputState="{inputState}" />
            {/if}
        </div>

        <span class="text-symbol fold:text-symbol-fold self-end justify-self-center"
            >{currentTranscripedSymbol.symbol}</span
        >

        <div class="flex justify-center w-20">
            {#if !!alphabetReferenceState}
                <AlphabetReferenceIcon state="{alphabetReferenceState}" />
            {/if}
        </div>
    </div>

    <p class="{isFailure || isSkipped || isSuccessWithSuggestion ? '' : 'invisible'} text-transcription">
        {currentTranscripedSymbol.displayedTranscription}
    </p>
    <TranscriptionInput
        alphabet="{alphabet}"
        currentTranscripedSymbol="{currentTranscripedSymbol}"
        settings="{settings}"
        bind:inputState
    />

    <AlphabetReference alphabet="{alphabet}" bind:state="{alphabetReferenceState}" />
</div>
