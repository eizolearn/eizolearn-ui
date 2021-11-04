<script lang="ts">
    import type { State } from './state'
    import type { TranscripedSymbol } from '../Alphabet/alphabet'

    export let transcriptionInput: string
    export let currentTranscripedSymbol: TranscripedSymbol
    export let inputState: State
    export let MAX_INPUT_LENGTH: number

    let localMaxLength: number = MAX_INPUT_LENGTH
    $: isFailure = $inputState === 'failure' || $inputState === 'skipped'

    $: (() => {
        if (currentTranscripedSymbol.validateTranscription(transcriptionInput) === 'correct') {
            localMaxLength = transcriptionInput.length
            inputState.succeed()
        } else if (transcriptionInput.length > localMaxLength) {
            transcriptionInput = transcriptionInput.substring(0, localMaxLength)
        }
    })()

    $: if ($inputState === 'input') {
        localMaxLength = MAX_INPUT_LENGTH
    }

    const keyUp = (event: KeyboardEvent): void => {
        if ($inputState === 'input' && (event.code === 'Enter' || event.key === 'Enter')) {
            localMaxLength = transcriptionInput.length
            if (transcriptionInput.trim() === '') {
                return inputState.skipped()
            }

            switch (currentTranscripedSymbol.validateTranscription(transcriptionInput)) {
                case 'correct':
                    return inputState.succeed()
                case 'noncanonical':
                    return inputState.succeedWithSuggestion()
                case 'incorrect':
                    return inputState.fail()
            }
        }
    }

    inputState.subscribe(value => {
        if (value === 'input') {
            transcriptionInput = ''
        }
    })
</script>

<style>
    .isFailure {
        @apply line-through;
    }
</style>

<input
    bind:value="{transcriptionInput}"
    on:keyup="{keyUp}"
    size="4"
    maxlength="{localMaxLength}"
    class="m-1 ml-4 round flex-grow text-center focus:outline-none bg-white"
    class:isFailure
/>
