<script lang="ts">
    import type { TranscripedSymbol, TranscriptionValidationResult, TranscripedAlphabet } from '../Alphabet/alphabet'
    import type { Settings } from '../Settings/settings'
    import { constructState } from './state'
    import TranscriptionOptionsInput from './TranscriptionOptionsInput.svelte'
    import TranscriptionTextInput from './TranscriptionTextInput.svelte'

    export let alphabet: TranscripedAlphabet
    export let currentTranscripedSymbol: TranscripedSymbol
    export let settings: Settings
    export const inputState = constructState()

    const validate = (event: CustomEvent<TranscriptionValidationResult | 'skipped'>) => {
        switch (event.detail) {
            case 'correct':
                return inputState.succeed()
            case 'noncanonical':
                return inputState.succeedWithSuggestion()
            case 'incorrect':
                return inputState.fail()
            case 'skipped':
                return inputState.skip()
        }
    }
</script>

{#if $settings.input === 'Text'}
    <div class="flex items-center bg-white rounded-lg text-input border border-primary w-60 h-9 mx-auto">
        <TranscriptionTextInput
            currentTranscripedSymbol="{currentTranscripedSymbol}"
            inputState="{inputState}"
            on:validated="{validate}"
        />
    </div>
{:else if $settings.input === 'Options'}
    <TranscriptionOptionsInput
        alphabet="{alphabet}"
        currentTranscripedSymbol="{currentTranscripedSymbol}"
        inputState="{inputState}"
        on:validated="{validate}"
    />
{/if}
