<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import type { State as AlphabetReferenceState } from '../AlphabetReference/state'
    import type { State as TranscriptionInputState } from '../TranscriptionInput/state'
    import type { Settings } from '../Settings/settings'
    import { constructState } from './state'
    import AlphabetReference from '../AlphabetReference/Component.svelte'
    import AlphabetReferenceIcon from '../AlphabetReference/Icon.svelte'
    import Score from '../Score/Component.svelte'
    import TranscriptionInput from '../TranscriptionInput/Component.svelte'
    import type { Alphabet } from '../Alphabet/alphabet'
    import type { TranscribedAlphabet } from '../Alphabet/alphabet'

    export let alphabet: Alphabet
    export let settings: Settings

    const currentAlphabet: TranscribedAlphabet = alphabet[$settings.inputLanguage]

    const state = constructState(currentAlphabet)
    const dispatch = createEventDispatcher<{ learnt: void }>()

    let inputState: TranscriptionInputState
    let alphabetReferenceState: AlphabetReferenceState

    let currentTranscribedSymbol = currentAlphabet.random

    $: isSuccess = $inputState === 'success'
    $: isSuccessWithSuggestion = $inputState === 'success with suggestion'
    $: isFailure = $inputState === 'failure'
    $: isSkipped = $inputState === 'skipped'
    $: (() => {
        if ($inputState === 'input') {
            currentTranscribedSymbol = currentAlphabet.random
        } else if ($inputState === 'success' || $inputState === 'success with suggestion') {
            state.hit(currentTranscribedSymbol.symbol)
        } else if ($inputState === 'failure' || $inputState === 'skipped') {
            state.miss()
        }
    })()
    $: (() => {
        if ($state === 'learnt') {
            dispatch('learnt')
        }
    })()
</script>

<style lang="postcss">
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
    class="h-full flex flex-col items-center text-primary mx-auto object-contain"
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
            >{currentTranscribedSymbol.symbol}</span
        >

        <div class="flex justify-center w-20">
            {#if alphabetReferenceState}
                <AlphabetReferenceIcon state="{alphabetReferenceState}" />
            {/if}
        </div>
    </div>

    <p class="{isFailure || isSkipped || isSuccessWithSuggestion ? '' : 'invisible'} text-transcription">
        {currentTranscribedSymbol.displayedTranscription}
    </p>
    <TranscriptionInput
        alphabet="{currentAlphabet}"
        currentTranscribedSymbol="{currentTranscribedSymbol}"
        settings="{settings}"
        bind:inputState
    />
    <AlphabetReference alphabet="{currentAlphabet}" bind:state="{alphabetReferenceState}" />
</div>
