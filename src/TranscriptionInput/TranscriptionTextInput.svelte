<script lang="ts" context="module">
    const MAX_INPUT_LENGTH = 5
</script>

<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import type { State } from './state'
    import type { TranscripedSymbol, TranscriptionValidationResult } from '../Alphabet/alphabet'
    import CheckMark from './checkmark.svg'
    import Cross from './cross.svg'
    import Enter from './enter.svg'
    import SkippedCross from './skipped.svg'

    export let currentTranscripedSymbol: TranscripedSymbol
    export let inputState: State

    const dispatch = createEventDispatcher<{ validated: TranscriptionValidationResult | 'skipped' }>()

    let localMaxLength: number = MAX_INPUT_LENGTH
    let transcriptionInput: string

    $: isFailure = $inputState === 'failure' || $inputState === 'skipped'
    $: if (currentTranscripedSymbol.validateTranscription(transcriptionInput) === 'correct') {
        localMaxLength = transcriptionInput.length
        dispatch('validated', 'correct')
    } else if (transcriptionInput.length > localMaxLength) {
        transcriptionInput = transcriptionInput.substring(0, localMaxLength)
    }
    $: if ($inputState === 'input') {
        localMaxLength = MAX_INPUT_LENGTH
    }

    const keyUp = (event: KeyboardEvent): void => {
        if ($inputState === 'input' && (event.code === 'Enter' || event.key === 'Enter')) {
            localMaxLength = transcriptionInput.length
            if (transcriptionInput.trim() === '') {
                dispatch('validated', 'skipped')
            } else {
                dispatch('validated', currentTranscripedSymbol.validateTranscription(transcriptionInput))
            }
        }
    }

    inputState.subscribe(value => {
        if (value === 'input') {
            transcriptionInput = ''
        }
    })
</script>

<style lang="postcss">
    .isFailure {
        @apply line-through;
    }
</style>

<div class="flex items-center bg-white rounded-lg text-input border border-primary w-60 h-9 mx-auto">
    <input
        bind:value="{transcriptionInput}"
        on:keyup="{keyUp}"
        size="4"
        maxlength="{localMaxLength}"
        class="m-1 ml-4 round flex-grow text-center focus:outline-none bg-white"
        class:isFailure
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
