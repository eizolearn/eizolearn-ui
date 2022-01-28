<script lang="ts" context="module">
    const MAX_OPTIONS = 3
</script>

<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import { shuffle } from '../utils/random'
    import type { TranscribedSymbol, TranscriptionValidationResult, TranscribedAlphabet } from '../Alphabet/alphabet'
    import type { State } from './state'

    export let alphabet: TranscribedAlphabet
    export let currentTranscribedSymbol: TranscribedSymbol
    export let inputState: State

    const dispatch = createEventDispatcher<{ validated: TranscriptionValidationResult | 'skipped' }>()

    $: options = (() => {
        const choosen = new Set<string>([currentTranscribedSymbol.displayedCanonicalTranscription.value])
        while (choosen.size != MAX_OPTIONS) {
            choosen.add(alphabet.random.randomTranscription.value)
        }
        return shuffle([...choosen])
    })()
</script>

<style>
    /* https://hype4.academy/tools/glassmorphism-generator */
    .optionButton {
        background: rgba(173, 216, 230, 0.25);
        box-shadow: 0 2px 8px 0 rgba(31, 38, 135, 0.37);
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        border-radius: 10px;
        border: 1px solid rgba(255, 255, 255, 0.18);
    }
    .enabledOptionButton:hover {
        background: rgba(173, 216, 230, 0.5);
    }
    .enabledOptionButton:focus {
        background: rgba(173, 216, 230, 0.7);
    }
</style>

<div class="w-2/3 max-w-7xl flex gap-3 justify-between">
    {#each options as option}
        <input
            class="optionButton flex-grow text-button text-primary rounded-md"
            class:enabledOptionButton="{$inputState === 'input'}"
            type="button"
            value="{option.toLocaleUpperCase()}"
            on:click="{() => dispatch('validated', currentTranscribedSymbol.validateTranscription(option))}"
            disabled="{$inputState !== 'input'}"
        />
    {/each}
</div>
